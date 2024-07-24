"use client";
import Link from "next/link";
import {Button} from "../ui/button";
import {FC} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

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
                    <Button className="bg-transparent">
                        <Link href={"/"} className="flex items-center space-x-1">
                            <Image
                                src="./assets/quizLogo.svg"
                                alt="Quiz"
                                width={32}
                                height={32}
                                priority
                            />
                            <h2 className="text-xl font-bold text-black">Quiz</h2>
                        </Link>
                    </Button>
                    <Button className="bg-slate-50 text-black">
                        <Link href="/games">Quiz</Link>
                    </Button>
                </div>
                {user?.isAuth ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-[#F6F5F4]">{user.player.length ? user.player.name: "profile"}</DropdownMenuTrigger>
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
