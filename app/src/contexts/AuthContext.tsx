"use client";
import React, { useContext, createContext, useState } from "react";

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  interface User {
    username: string;
    password: string;
  }

  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      throw new Error("Missing username or password");
    }
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      setUser({ username, password });
    } catch (error) {
      console.error(error);
    }
  };

  const registerContext = (username: string, password: string) => {
    if (!username || !password) {
      throw new Error("Missing username or password");
    }
    setUser({ username, password });
    try {
      (async () => {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
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
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}
