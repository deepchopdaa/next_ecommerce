"use client";

import { useEffect, useState } from "react";
import Sidebar, { drawerWidth, collapsedWidth } from "./components/sidebar";
import {
    AppBar,
    Toolbar,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

export default function SellerAuthWrapper({ children }) {
    const [isAuth, setIsAuth] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuth(!!token);
    }, []);

    if (isAuth === null) return <div>Loading...</div>;
    if (!isAuth) return <div>Please Login to access Seller Dashboard</div>;

    const role = localStorage.getItem("role");
    if (role !== "admin") {
        return (
            <h1 className="text-center text-3xl mt-10 text-red-500">
                Admin Access Only
            </h1>
        );
    }

    return (
        <div className="flex w-full">
            {/* Mobile AppBar */}
            {isMobile && (
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setMobileOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}

            <Sidebar
                isOpen={isOpen}
                onToggle={() => setIsOpen((p) => !p)}
                mobileOpen={mobileOpen}
                handleDrawerToggle={() => setMobileOpen(false)}
            />

            {/* Main Content */}
            <main
                style={{
                    marginLeft: isMobile
                        ? 0
                        : isOpen
                            ? drawerWidth
                            : collapsedWidth,
                    transition: "margin-left 0.3s",
                    width: "100%",
                    paddingTop: isMobile ? 64 : 0,
                }}
            >
                {children}
            </main>
        </div>
    );
}
