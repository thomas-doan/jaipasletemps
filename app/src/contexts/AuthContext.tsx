"use client";
import React, {useContext, createContext, useState, useEffect} from "react";
import * as jwt from "jsonwebtoken";

const AuthContext = createContext<any>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}: any) {
    interface User {
        id?: string;
        email?: string;
        name?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        token?: string;
        role?: string;
        player?: string;
        isAuth?: boolean;
    }

    const [user, setUser] = useState<User | null>({isAuth: false});

    useEffect(() => {
        const syncUserFromLocalStorage = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } else {
                setUser({isAuth: false});
            }
        };

        // Sync on mount
        syncUserFromLocalStorage();

        // Set up event listener for storage changes
        window.addEventListener("storage", syncUserFromLocalStorage);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("storage", syncUserFromLocalStorage);
        };
    }, []);

    const setUserAndStorage = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

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
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();

            const token = jwt.decode(data.access_token) as jwt.JwtPayload;
            console.log("Decoded token:", token);
            if (token) {
                const newUser = {
                    id: token.sub,
                    email: token.email,
                    role: token.role,
                    token: data.access_token,
                    player:
                        token.players && token.players.length > 0 ? token.players[0] : null,
                    isAuth: true,
                };
                setUserAndStorage(newUser);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUserAndStorage({isAuth: false});
        localStorage.removeItem("user");
    };

    const registerContext = async (
        email: string,
        password: string,
        name: string
    ) => {
        if (!email || !password || !name) {
            throw new Error("Missing email or password");
        }
        setUser({email, password});
        try {
            await (async () => {
                const response = await fetch("http://localhost:3000/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email, password, name}),
                });
                const data = await response.json();
                console.log(data);
            })();
        } catch (error) {
            console.error(error);
        }
    };

    const refreshUserData = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            console.error("No user data found in local storage");
            return;
        }

        const {token} = JSON.parse(storedUser);
        if (!token) {
            console.error("No token found in stored user data");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/refresh", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const decodedToken = jwt.decode(data.access_token) as jwt.JwtPayload;
            if (decodedToken) {
                const updatedUser = {
                    id: decodedToken.sub,
                    email: decodedToken.email,
                    role: decodedToken.role,
                    token: data.access_token,
                    player:
                        decodedToken.players && decodedToken.players.length > 0
                            ? decodedToken.players[0]
                            : null,
                    isAuth: true,
                };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Failed to refresh user data:", error);
            // Optionally, you might want to log out the user if refresh fails
            // logout();
        }
    };

    // Autres fonctions d'authentification

    return (
        <AuthContext.Provider
            value={{user, login, logout, registerContext, refreshUserData}}
        >
            {children}
        </AuthContext.Provider>
    );
}
