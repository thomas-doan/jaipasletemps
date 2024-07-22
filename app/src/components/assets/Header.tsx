"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { FC, useEffect, useState } from "react";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
          <Button>Profile</Button>
        ) : (
          <Button type="button" variant="default">
            <Link href="/login">Connexion</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
