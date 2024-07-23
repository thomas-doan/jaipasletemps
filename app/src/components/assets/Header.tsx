"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { FC, use, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export const Header: FC = () => {
  const [user, setUser] = useState<User | null>({ isAuth: false });
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (logout) {
      localStorage.removeItem("user");
      setUser({ isAuth: false });
    }
    setLogout(false);
  }, [logout]);

  return (
    <header className="max-h-16 w-full flex justify-center items-center py-2 px-3 border-b">
      <div className="flex w-full justify-between">
        <div className="flex space-x-4">
          <Button>Home</Button>
          <Button>
            <Link href="/games">Games</Link>
          </Button>
        </div>
        {user?.isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger>Profil</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogout(true)}>
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button type="button" variant="default">
            <Link href="/login">Connexion</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
