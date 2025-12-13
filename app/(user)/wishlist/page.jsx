"use client";

import React, { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Button
} from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useSelector, useDispatch } from "react-redux";
import { removeFromWishList } from "../../store/slices/withlist";
import { addToCart } from "../../store/slices/cartSlice";

const WishlistPage = () => {

    const [loading, setLoading] = useState(null);
    const wishlist = useSelector((state) => state.wishList.wishListItems);

    console.log(wishlist, "wishlist")

    const dispatch = useDispatch();

    /* Action of the Product */
    const handleClick = (product) => {
        setLoading(product._id);
        setTimeout(() => {
            console.log("Adding:", product);
            dispatch(addToCart(product));
            dispatch(removeFromWishList(product._id))
            setLoading(null);
        }, 2000);
    }

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>

            {wishlist?.length === 0 ? (
                <p className="text-center text-lg">Your wishlist is empty.</p>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: "12px", padding: "10px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 700 }}>Product</TableCell>
                                <TableCell style={{ fontWeight: 700 }} align="center">Price</TableCell>
                                <TableCell style={{ fontWeight: 700 }} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {wishlist?.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Image
                                                width={65}
                                                height={65}
                                                src={`/uploads/${item.image}`}
                                                alt={item.name}
                                                className="object-contain rounded-md border"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell align="center">
                                        ₹{item.discountPrice.toLocaleString()}
                                    </TableCell>

                                    <TableCell align="center">
                                        <div className="flex items-center gap-4 justify-center">
                                            <Button
                                                color="success"
                                                variant="contained"
                                                startIcon={<AddShoppingCartIcon />}
                                                onClick={() => handleClick(item)}
                                                loading={loading === item._id}
                                                loadingPosition="end"
                                            >
                                                Move to Cart
                                            </Button>

                                            <IconButton
                                                color="error"
                                                onClick={() => dispatch(removeFromWishList(item._id))}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default WishlistPage;
