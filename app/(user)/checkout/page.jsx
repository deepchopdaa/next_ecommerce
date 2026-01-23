"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box, TextField } from "@mui/material"
import SnackbarSimple from '../Components/SnakeBar'
import { clearCart } from "@/app/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { createOrder } from '../services/order'

const page = () => {

    const cart = useSelector((state) => state.cart.cartItems)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
    })


    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });


    const PlaceOrder = async (data) => {
        const itemsPrice = cart?.reduce(
            (total, item) => total + item.discountPrice * item.quantity,
            0
        );

        const shippingPrice = 40;
        const taxPrice = 0;
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        const submitdata = {
            orderItems: cart?.map((item) => ({
                product: item._id,
                name: item?.name,
                image: item?.image,
                qty: item?.quantity,
                price: item?.discountPrice,
                sellerId: item?.sellerId
            })),

            shippingAddress: data,

            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        };

        try {
            const res = await createOrder({ submitdata })
            console.log(res, "responce from the create order api")
            setLoading(false);
            setSnack({
                open: true,
                message: "Order Placed Successfully",
                severity: "success",
            });
            dispatch(clearCart())
            router.push(`/myorders`)
            reset()

        } catch (error) {
            console.error("Order creation failed:", error);
            setLoading(false);
            setSnack({
                open: true,
                message: error.message || "Orderd Not Placed",
                severity: "error",
            });
        }
    };





    return (
        <div>
            <Box sx={{ width: "1000px", mx: "auto", mt: 5 }}>
                <form onSubmit={handleSubmit(PlaceOrder)}>

                    {/* Checkout Card */}
                    <Box
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                            background: "linear-gradient(to bottom right, #ffffff, #f8fbff)",
                            border: "1px solid #e6e9ee",
                        }}
                    >
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                            Checkout Information
                        </h2>

                        {/* Full Name */}
                        <Box mb={3}>
                            <TextField
                                label="Full Name"
                                fullWidth
                                name="fullName"
                                type="text"
                                variant="outlined"
                                {...register("fullName", {
                                    required: "full name required",
                                    min: {
                                        value: 3,
                                        message: "Full Name Must Be contain 3 character",
                                    },
                                })}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                                sx={{ bgcolor: "#fff" }}
                            />
                        </Box>

                        {/* Phone */}
                        <Box mb={3}>
                            <TextField
                                label="Phone Number"
                                fullWidth
                                name="phone"
                                type="number"
                                variant="outlined"
                                {...register("phone", {
                                    required: "phone required",
                                    /* min: {
                                        value: 10,
                                        message: "Must Be contain 10 character",
                                    },
                                    max: {
                                        value: 10,
                                        message: "Must be contain 10 character",
                                    }, */
                                    pattern: {
                                        value: /^(?:\+91[- ]?|0)?[6-9]\d{9}$/,
                                        message: "Invalid Format",
                                    },
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                sx={{ bgcolor: "#fff" }}
                            />
                        </Box>

                        {/* Address */}
                        <Box mb={3}>
                            <TextField
                                name="address"
                                label="Address"
                                fullWidth
                                type="text"
                                multiline
                                rows={2}
                                variant="outlined"
                                {...register("address", {
                                    required: "Address required",
                                    min: {
                                        value: 10,
                                        message: "Address Must Be contain 10 character",
                                    },
                                })}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                sx={{ bgcolor: "#fff" }}
                            />
                        </Box>

                        {/* City + State (2 Column layout) */}
                        <Box
                            mb={3}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                gap: 2,
                            }}
                        >
                            <TextField
                                name="city"
                                label="City"
                                fullWidth
                                type="text"
                                variant="outlined"
                                {...register("city", {
                                    required: "city required",
                                    min: {
                                        value: 2,
                                        message: "city Must Be contain 2 character",
                                    },
                                })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                                sx={{ bgcolor: "#fff" }}
                            />

                            <TextField
                                name="state"
                                label="State"
                                fullWidth
                                type="text"
                                variant="outlined"
                                {...register("state", {
                                    required: "state required",
                                    min: {
                                        value: 2,
                                        message: "state Must Be contain 2 character",
                                    },
                                })}
                                error={!!errors.state}
                                helperText={errors.state?.message}
                                sx={{ bgcolor: "#fff" }}
                            />
                        </Box>

                        {/* PIN + Country (2 Column layout) */}
                        <Box
                            mb={3}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                gap: 2,
                            }}
                        >
                            <TextField
                                name="postalCode"
                                label="Postal Code"
                                fullWidth
                                type="text"
                                variant="outlined"
                                {...register("postalCode", {
                                    required: "postalCode required",
                                    /*  min: {
                                         value: 6,
                                         message: "postalCode Must Be contain 6 character",
                                     },
                                     max: {
                                         value: 6,
                                         message: "Must be contain 6 character",
                                     }, */
                                    pattern: {
                                        value: /^[1-9][0-9]{5}$/,
                                        message: "Invalid Format",
                                    },
                                })}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode?.message}
                                sx={{ bgcolor: "#fff" }}
                            />

                            <TextField
                                name="country"
                                label="Country"
                                fullWidth
                                type="text"
                                variant="outlined"
                                {...register("country", {
                                    required: "country required",
                                    min: {
                                        value: 2,
                                        message: "country Must Be contain 2 character",
                                    },
                                })}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                                sx={{ bgcolor: "#fff" }}
                            />
                        </Box>

                        {/* Submit Button */}
                        <Box sx={{ textAlign: "right", mt: 3 }}>
                            <Button
                                variant="contained"
                                color="info"
                                disabled={loading}
                                type="submit"
                                sx={{
                                    py: 1.2,
                                    px: 4,
                                    fontWeight: "bold",
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontSize: "17px",
                                    boxShadow: "0 4px 12px rgba(56, 126, 255, 0.3)",
                                }}
                            >
                                {loading ? "Confirming Order..." : "Confirm Order"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>

            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack?.message}
                severity={snack.severity}
            />
        </div>
    )
}

export default page
