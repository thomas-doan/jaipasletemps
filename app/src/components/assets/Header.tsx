"use client";
import Link from "next/link";
import {Button} from "../ui/button";
import {FC, use, useEffect, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
    user: any;
    logout: any;
}

export const Header: FC<HeaderProps> = (props) => {
    const {user, logout} = props;

    return (
        <header className="max-h-16 w-full flex justify-center items-center py-2 px-3 border-b">
            <div className="flex w-full justify-between">
                <div className="flex space-x-4">
                    <Button>
                        <Link href={"/"}>Home</Link>
                    </Button>
                    <Button>
                        <Link href="/games">Games</Link>
                    </Button>
                </div>
                {user?.isAuth ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>Profil</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Profil</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => logout()}>
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
