"use client";
import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "@/app/store/slices/cartSlice";
import Button from '@mui/material/Button';
import Link from "next/link";

const CartPage = () => {
    const cart = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
        <>
            <div className="max-w-5xl mx-auto mt-10">
                <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-lg">Your cart is empty.</p>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: "12px", padding: "10px" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 700 }}>Product</TableCell>
                                    <TableCell style={{ fontWeight: 700 }} align="center">Price</TableCell>
                                    <TableCell style={{ fontWeight: 700 }} align="center">Quantity</TableCell>
                                    <TableCell style={{ fontWeight: 700 }} align="center">Total</TableCell>
                                    <TableCell style={{ fontWeight: 700 }} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {cart.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Image width={65} height={65} src={`/uploads/${item.image}`} alt={item.name}
                                                    className="object-contain rounded-md border" />
                                                <div>
                                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell align="center">₹{item.discountPrice.toLocaleString()}</TableCell>

                                        <TableCell align="center">
                                            <div className="flex items-center gap-2 justify-center">
                                                <IconButton color="success" onClick={() => dispatch(decreaseQty(item._id))}>
                                                    <RemoveIcon />
                                                </IconButton>

                                                <span className="font-semibold">{item.quantity}</span>

                                                <IconButton color="success" onClick={() => dispatch(increaseQty(item._id))}>
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>

                                        <TableCell align="center">
                                            ₹{(item.discountPrice * item.quantity).toLocaleString()}
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton color="error" onClick={() => dispatch(removeFromCart(item._id))}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex justify-end mt-5 pr-10 gap-5">
                            <h2 className="text-2xl font-bold">
                                Total: ₹
                                {cart.reduce((total, item) => total + item.discountPrice * item.quantity, 0).toLocaleString()}
                            </h2>
                            <Link href="/checkout">
                                <Button
                                    variant="contained"
                                    style={{ float: "right" }}
                                    color="info"
                                >
                                    CheckOut
                                </Button>
                            </Link>
                        </div>
                    </TableContainer>
                )}

            </div>

        </>
    );
};

export default CartPage;
