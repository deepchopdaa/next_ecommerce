"use client";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
export default function AdminAuthWrapper({ children }) {
    const [isAuth, setIsAuth] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuth(!!token);
    }, []);

    if (isAuth === null) return <div>Loading...</div>;
    if (!isAuth) return <div>Please Login to access Admin Dashboard</div>;

    const sidebarWidth = isOpen ? "w-60" : "w-20";
    const marginLeft = isOpen ? "ml-60" : "ml-20";

    const role = localStorage.getItem("role")

    return (

        role === "admin" ? (
            < div className="flex" >
                <div className={`${sidebarWidth} fixed h-screen transition-all duration-300`}>
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>

                <div className={`${marginLeft} flex-1 transition-all duration-300`}>
                    {children}
                </div>
            </div >) : <h1 className="text-center text-3xl mt-10 text-red-500">Admin AccessOnly</h1>

    );
}