"use client"
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/slices/cartSlice';
import { addToWishList } from '@/app/store/slices/withlist';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button } from '@mui/material';

const CartButton = ({ product }) => {
    const [loading, setLoading] = React.useState(null);
    const [loading1, setLoading1] = React.useState(null);

    const dispatch = useDispatch();

    const handleClick = (product) => {
        setLoading(product._id);
        setTimeout(() => {
            console.log("Adding:", product);
            dispatch(addToCart(product));
            setLoading(null);
        }, 2000);
    }

    const handlewishlist = (product) => {
        setLoading1(product._id);
        setTimeout(() => {
            console.log("Adding:", product);
            dispatch(addToWishList(product));
            setLoading1(null);
        }, 2000);
    }

    return (
        <div className='flex gap-4 lg:gap-4 2xl:gap-2  justify-center'>

            <Button
                size="small"
                onClick={() => handleClick(product)}
                endIcon={<SendIcon />}
                color="success"
                loading={loading === product?._id}
                loadingPosition="end"
                variant="contained"
                sx={{
                    fontSize: {
                        xs: "0.7rem",
                        sm: "0.75rem",
                        md: "0.8rem",
                        lg: "0.85rem",
                    },
                    padding: {
                        xs: "4px 8px",
                        sm: "6px 10px",
                        md: "6px 12px",
                    },
                    minWidth: "auto",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                }}
            >
                Add to Cart
            </Button>

            <Button
                size="small"
                onClick={() => handlewishlist(product)}
                endIcon={<SendIcon />}
                color="info"
                loading={loading1 === product?._id}
                loadingPosition="end"
                variant="contained"
                sx={{
                    fontSize: {
                        xs: "0.7rem",
                        sm: "0.75rem",
                        md: "0.8rem",
                        lg: "0.85rem",
                    },
                    padding: {
                        xs: "4px 8px",
                        sm: "6px 10px",
                        md: "6px 12px",
                    },
                    minWidth: "auto",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                }}
            >
                Add to Wishlist
            </Button>

        </div>
    )
}

export default CartButton
