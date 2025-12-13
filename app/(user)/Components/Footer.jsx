"use client";

import { Box, Container, Grid, TextField, Button, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import Image from "next/image";
import logo from '../../../public/images/logo.jpg';


export default function Footer() {
    return (
        <Box className="bg-gray-100 text-gray-800 mt-16 pt-14 pb-6">
            <Container maxWidth="lg">
                <Grid container spacing={6}>

                    {/* Brand + Short Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Box>
                            <Image
                                src={logo}
                                alt="Logo"
                                width={120}
                                height={50}
                                className="mb-4"
                            />
                            <p className="text-gray-600 text-sm leading-6">
                                Your trusted e-commerce store for quality products & fast delivery.
                            </p>

                            <Box className="flex gap-3 mt-5">
                                <IconButton className="text-gray-700 hover:text-gray-900">
                                    <Facebook />
                                </IconButton>
                                <IconButton className="text-gray-700 hover:text-gray-900">
                                    <Instagram />
                                </IconButton>
                                <IconButton className="text-gray-700 hover:text-gray-900">
                                    <Twitter />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                    {/* SHOP */}
                    <Grid item xs={12} sm={6} md={3}>
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Shop</h3>
                        <p className="text-gray-700 mb-2 cursor-pointer hover:text-black">Men</p>
                        <p className="text-gray-700 mb-2 cursor-pointer hover:text-black">Women</p>
                        <p className="text-gray-700 mb-2 cursor-pointer hover:text-black">Kids</p>
                        <p className="text-gray-700 mb-2 cursor-pointer hover:text-black">Accessories</p>
                    </Grid>

                    {/* CUSTOMER SERVICE */}
                    <Grid item xs={12} sm={6} md={3}>
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Customer Service</h3>
                        <p className="text-gray-700 mb-2 hover:text-black cursor-pointer">FAQ</p>
                        <p className="text-gray-700 mb-2 hover:text-black cursor-pointer">Order Tracking</p>
                        <p className="text-gray-700 mb-2 hover:text-black cursor-pointer">Returns</p>
                        <p className="text-gray-700 mb-2 hover:text-black cursor-pointer">Shipping Info</p>
                    </Grid>

                    {/* NEWSLETTER */}
                    <Grid item xs={12} sm={6} md={3}>
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Newsletter</h3>
                        <p className="text-gray-600 text-sm mb-3">
                            Subscribe for exclusive offers & updates.
                        </p>

                        <TextField
                            variant="outlined"
                            placeholder="Enter your email"
                            size="small"
                            fullWidth
                            className="bg-white rounded"
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            className="mt-3 normal-case font-semibold"
                        >
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>

                {/* Bottom Strip */}
                <Box className="text-center text-gray-600 mt-10 pt-6 border-t border-gray-300">
                    © {new Date().getFullYear()} Your Company — All Rights Reserved.
                </Box>
            </Container>
        </Box>
    );
}
