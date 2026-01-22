"use client";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMyOrders } from "../services/profile";
import SnackbarSimple from "../Components/SnakeBar";
export default function MyOrders() {
    const [token, setToken] = useState(null);
    const [orders, setOrders] = useState([]);
    const router = useRouter()
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    /* Calling Api for orders */
    const fetchOrders = async () => {
        try {
            const res = await getMyOrders(token)
            setOrders(res.orders || []);

        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "Order fetch failed !",
                severity: "error",
            });
        }
    };

    useEffect(() => {
        const t = localStorage.getItem("token");
        setToken(t);
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <div className="max-w-5xl mx-auto p-4 space-y-4">

                <h1 className="text-2xl font-bold mb-4">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No orders found.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <Card key={order._id} className="shadow-sm p-2">
                            <CardHeader
                                title={
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">
                                            Order ID: #{order._id.slice(-6)}
                                        </span>

                                        <Chip
                                            label={order.orderStatus}
                                            color={
                                                order.orderStatus === "Delivered"
                                                    ? "success"
                                                    : order.orderStatus === "Cancelled"
                                                        ? "error"
                                                        : "warning"
                                            }
                                            className="!text-white"
                                            sx={{ borderRadius: "8px", px: 1 }}
                                        />
                                    </div>
                                }
                            />

                            <CardContent className="space-y-4">
                                {/* Order Items */}
                                <div className="space-y-3">
                                    {order.orderItems.map((item) => (
                                        <div
                                            key={item.product}
                                            className="flex gap-4 items-center border-b pb-3"
                                        >
                                            <Image
                                                src={`/uploads/${item.image}`} // Relative to public/
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className="rounded object-cover"
                                            />

                                            <div className="flex-1">
                                                <h2 className="font-medium text-lg">{item.name}</h2>
                                                <p className="text-sm text-gray-600">
                                                    Qty: {item.qty}
                                                </p>
                                            </div>

                                            <p className="font-semibold">₹{item.price}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Shipping */}
                                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                    <h3 className="font-semibold mb-1">Shipping Address</h3>
                                    <p>
                                        {order.shippingAddress.fullName},{" "}
                                        {order.shippingAddress.phone}
                                    </p>
                                    <p>
                                        {order.shippingAddress.address},{" "}
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.state} -{" "}
                                        {order.shippingAddress.postalCode}
                                    </p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>

                                {/* Payment Info */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="font-semibold">Payment</p>
                                        <p>{order.paymentMethod}</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold">Payment Status</p>

                                        <Chip
                                            label={order.paymentStatus}
                                            color={
                                                order.paymentStatus === "Paid"
                                                    ? "success"
                                                    : order.paymentStatus === "Failed"
                                                        ? "error"
                                                        : "warning"
                                            }
                                            className="!text-white"
                                            sx={{ borderRadius: "8px", px: 1 }}
                                        />
                                    </div>

                                    <div>
                                        <p className="font-semibold">Order Date</p>
                                        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold">Total Amount</p>
                                        <p className="font-bold text-lg">₹{order.totalPrice}</p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                {/*                             <div className="flex justify-end gap-3 mt-3">
                                <Button variant="outlined">View Details</Button>
                                
                                </div>
                                */}                        </CardContent>
                        </Card>
                    ))
                )}
            </div>
            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack.message}
                severity={snack.severity}
            />
        </>
    );
}
