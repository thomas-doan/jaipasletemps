"use client";
import React, {ReactNode} from 'react';
import {Header} from './Header';
import {useAuth} from "@/contexts/AuthContext";

type LayoutProps = {
    children: ReactNode;
};

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

const Layout: React.FC<LayoutProps> = ({children}) => {
    const { user, logout } = useAuth();
    return (
        <>
            <Header user={user} logout={logout}/>
            {children}
        </>
    );
};

export default Layout;