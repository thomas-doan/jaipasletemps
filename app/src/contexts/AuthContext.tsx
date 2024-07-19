"use client";
import React, { useContext, createContext, useState } from "react";

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  interface User {
    email: string;
    password: string;
  }

  const [user, setUser] = useState<User | null>(null);

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
      console.log(data);
      setUser({ email, password });
    } catch (error) {
      console.error(error);
    }
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

  return (
    <AuthContext.Provider value={{ user, login, registerContext }}>
      {children}
    </AuthContext.Provider>
  );
}
