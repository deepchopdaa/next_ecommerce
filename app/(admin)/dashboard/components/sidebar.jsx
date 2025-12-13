"use client";

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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

const drawerWidth = 240;
const collapsedWidth = 60;

const menuItems = [
    { name: "Product", href: "/dashboard" },
    { name: "Category", href: "/dashboard/category" },
    { name: "Brand", href: "/dashboard/brand" },
    // Add more items here later
];

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed(!collapsed);

    const drawer = (
        <div>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: collapsed ? "center" : "space-between",
                    alignItems: "center",
                }}
            >
                {!collapsed && <Typography variant="h6">Admin</Typography>}

                <IconButton onClick={toggleCollapsed} size="small">
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>
            <Divider />

            <List>
                {menuItems.map((item) => (
                    <Link href={item.href} key={item.name} passHref>
                        <ListItemButton
                            selected={pathname === item.href}
                            sx={{
                                justifyContent: collapsed ? "center" : "flex-start",
                            }}
                        >
                            <ListItemText
                                primary={item.name}
                                sx={{ display: collapsed ? "none" : "block" }}
                            />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
            <Button color="info" variant="contained" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}>
                Logout
            </Button>
        </div>
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

            {/* Permanent Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: collapsed ? collapsedWidth : drawerWidth,
                        boxSizing: "border-box",
                        transition: "width 0.3s",
                        overflowX: "hidden",
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </>
    );
}

export { drawerWidth, collapsedWidth };
