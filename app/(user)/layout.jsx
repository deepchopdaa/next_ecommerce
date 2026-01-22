import React from "react";
import Header from "./Components/Header"
import Footer from "./Components/Footer"


export default function Userlayout({ children }) {


    const token = typeof window !== "undefined"
        ? localStorage.getItem("token") : null

    const role = typeof window !== "undefined"
        ? localStorage.getItem("role") : null
    return (
        token ? role === "user" ?
            <div>
                <Header />
                {children}
                <Footer />
            </div> : <h1>Admin can't access</h1> : <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}