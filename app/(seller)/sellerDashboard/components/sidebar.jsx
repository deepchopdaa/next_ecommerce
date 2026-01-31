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
    Box,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";

export const drawerWidth = 240;
export const collapsedWidth = 60;

const menuItems = [
    { name: "Product", href: "/sellerDashboard", icon: <InventoryIcon /> },
    { name: "My Orders", href: "/sellerDashboard/myorders", icon: <ShoppingBagIcon /> },
    { name: "Profile", href: "/sellerDashboard/profile", icon: <PersonIcon /> },
];

export default function Sidebar({
    mobileOpen,
    handleDrawerToggle,
    isOpen,
    onToggle,
}) {
    const pathname = usePathname();
    const collapsed = !isOpen;

    const drawerContent = (
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
                    px: 2,
                }}
            >
                {!collapsed && (
                    <Typography fontWeight={700} letterSpacing={1}>
                        SELLER
                    </Typography>
                )}

                {/* Collapse only affects desktop */}
                <IconButton
                    onClick={onToggle}
                    size="small"
                    sx={{ color: "#fff", display: { xs: "none", sm: "block" } }}
                >
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Menu */}
            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link href={item.href} key={item.name}>
                            <ListItemButton
                                onClick={handleDrawerToggle} // closes mobile
                                selected={isActive}
                                sx={{
                                    mx: 1,
                                    mb: 0.5,
                                    borderRadius: 2,
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    borderLeft: isActive
                                        ? "4px solid #fff"
                                        : "4px solid transparent",
                                    backgroundColor: isActive
                                        ? "rgba(255,255,255,0.18)"
                                        : "transparent",
                                }}
                            >
                                {item.icon}

                                {!collapsed && (
                                    <ListItemText
                                        primary={item.name}
                                        sx={{ ml: 1 }}
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
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: collapsed ? collapsedWidth : drawerWidth,
                        transition: "width 0.3s",
                        overflowX: "hidden",
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
}
