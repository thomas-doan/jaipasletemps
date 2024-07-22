"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import * as jwt from "jsonwebtoken";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  interface User {
    id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    role?: string;
    player?: string;
    isAuth?: boolean;
  }

  const [user, setUser] = useState<User | null>({ isAuth: false });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Missing email or password");
    }
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      const token = jwt.decode(data.access_token) as jwt.JwtPayload;

      if (token) {
        const newUser = {
          id: token.sub,
          email: token.email,
          role: token.role,
          token: data.access_token,
          player: token.players.length > 0 ? token.players[0] : null,
          isAuth: true,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    setUser({ isAuth: false });
    localStorage.removeItem("user");
  };

  const registerContext = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Missing email or password");
    }
    setUser({ email, password });
    try {
      (async () => {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
      })();
    } catch (error) {
      console.error(error);
    }
  };

  // Autres fonctions d'authentification

  const value = {
    user,
    login,
    logout,
    registerContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};