"use client";
import * as React from "react";
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    InputBase,
    Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.jpg";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems)
    const wishlistItem = useSelector((state) => state.wishList.wishListItems)
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/products" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];
    const pathname = usePathname();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const token = localStorage.getItem("token")

    const drawer = (
        <Box onClick={handleDrawerToggle} className="w-64 bg-white h-full p-4 text-gray-800">
            <Typography variant="h6" className="font-semibold mb-4">
                Menu
            </Typography>

            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={Link} href={item.href}>
                            <ListItemText
                                primary={item.label}
                                className={pathname === item.href ? "font-bold text-black" : "text-gray-600"}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box className="sticky top-0 z-50">
            <AppBar
                sx={{ position: "sticky" }}
                className="bg-white text-gray-900 shadow-lg"
            >
                <Toolbar className="flex justify-between items-center">

                    {/* Left: Logo */}
                    <Box className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <IconButton
                            className="block lg:!hidden text-gray-900"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Link href="/">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={110}
                                height={40}
                                className="object-contain hidden sm:flex"
                            />
                        </Link>
                    </Box>

                    {/* Center: Navigation (Desktop Only) */}
                    <Box className="hidden lg:flex gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`font-medium transition-all ${pathname === item.href
                                    ? "text-black border-b-2 border-black pb-1"
                                    : "text-gray-700 hover:text-black"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </Box>

                    {/* Center: Search Bar */}
                    <Box className="flex bg-gray-100 px-3 py-1 rounded-lg items-center">
                        <SearchIcon className="text-gray-600" />
                        <InputBase
                            placeholder="Search…"
                            className="ml-2 w-48 md:w-64 lg:w-92 xl:w-128 "
                        />
                    </Box>

                    {/* Desktop Icons */}
                    <Box className="hidden md:flex items-center gap-4">

                        {/* Wishlist Button */}
                        <Link href="/wishlist">
                            <IconButton>
                                <Badge badgeContent={wishlistItem?.length ?? 0} color="error">
                                    {pathname.startsWith("/wishlist")
                                        ? <FavoriteIcon />
                                        : <FavoriteBorderOutlinedIcon />}
                                </Badge>
                            </IconButton>
                        </Link>

                        {/* Account Button */}
                        <Link href={token ? "/myorders" : "/login"}>
                            <IconButton
                                className={`
                                    font-medium transition-all
                                    ${pathname.startsWith("/login")
                                        ? "text-black font-bold pb-1"
                                        : "text-gray-700 hover:text-black"
                                    }
                                `}
                            >
                                {pathname.startsWith("/login")
                                    ? <AccountCircle />
                                    : <AccountCircleOutlined />
                                }
                            </IconButton>
                        </Link>

                        {/* Cart Button */}
                        <Link href="/cart">
                            <IconButton>
                                <Badge badgeContent={cartItems?.length ?? 0} color="error">
                                    {pathname.startsWith("/cart")
                                        ? <ShoppingCartCheckoutIcon />
                                        : <ShoppingCartIcon />
                                    }
                                </Badge>
                            </IconButton>
                        </Link>
                    </Box>

                    {/* Mobile Search + Icons */}
                    <Box className="md:hidden flex items-center gap-3">
                        <IconButton className="text-gray-900">
                            <SearchIcon />
                        </IconButton>

                        <Link href="/cart">
                            <IconButton>
                                <Badge badgeContent={cartItems?.length ?? 0} color="error">
                                    {pathname.startsWith("/cart")
                                        ? <ShoppingCartCheckoutIcon />
                                        : <ShoppingCartIcon />
                                    }
                                </Badge>
                            </IconButton>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </Box >
    );
}
