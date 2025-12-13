import React from "react";
import Header from "./Components/Header"
import Footer from "./Components/Footer";
export default function Userlayout({ children }) {
    const role = localStorage.getItem("role")
    return (
        role === "user" ? (
            <div>
                <Header />
                {children}
                <Footer />
            </div>) : <h1 className="text-center text-3xl mt-10 text-red-500">Only User Access</h1>
    );
}