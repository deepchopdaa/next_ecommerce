"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Button,
    Box,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;
const collapsedWidth = 60;

const menuItems = [
    { name: "Product", href: "/sellerDashboard", icon: <InventoryIcon /> },
    { name: "My Orders", href: "/sellerDashboard/myorders", icon: <ShoppingBagIcon /> },
    { name: "Profile", href: "/sellerDashboard/profile", icon: <PersonIcon /> },
];

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed(!collapsed);

    const drawer = (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(180deg, #0288d1, #01579b)",
                color: "#fff",
            }}
        >
            {/* Header */}
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: collapsed ? "center" : "space-between",
                    alignItems: "center",
                    px: 2,
                }}
            >
                {!collapsed && (
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        letterSpacing={1}
                    >
                        SELLER
                    </Typography>
                )}

                <IconButton onClick={toggleCollapsed} size="small" sx={{ color: "#fff" }}>
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Menu */}
            <List sx={{ flexGrow: 1, mt: 1 }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link href={item.href} key={item.name} passHref>
                            <ListItemButton
                                selected={isActive}
                                sx={{
                                    mx: 1,
                                    mb: 0.5,
                                    borderRadius: 2,
                                    justifyContent: collapsed ? "center" : "flex-start",

                                    // White side indicator
                                    borderLeft: isActive
                                        ? "4px solid #fff"
                                        : "4px solid transparent",

                                    backgroundColor: isActive
                                        ? "rgba(255,255,255,0.18)"
                                        : "transparent",

                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.25)",
                                    },

                                    transition: "all 0.2s ease",
                                }}
                            >
                                {/* Icon */}
                                <Box
                                    sx={{
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        mr: collapsed ? 0 : 1.5,
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                {/* Text */}
                                {!collapsed && (
                                    <ListItemText
                                        primary={item.name}
                                        primaryTypographyProps={{
                                            fontSize: 14,
                                            fontWeight: isActive ? 600 : 400,
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </Link>
                    );
                })}
            </List>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Logout */}
            <Button
                sx={{
                    m: 1.5,
                    backgroundColor: "#fff",
                    color: "#0288d1",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                        backgroundColor: "#e3f2fd",
                    },
                }}
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }}
            >
                Logout
            </Button>
        </Box>
    );

    return (
        <>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: collapsed ? collapsedWidth : drawerWidth,
                        boxSizing: "border-box",
                        transition: "width 0.3s",
                        overflowX: "hidden",
                        boxShadow: "4px 0 10px rgba(0,0,0,0.15)",
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export { drawerWidth, collapsedWidth };
