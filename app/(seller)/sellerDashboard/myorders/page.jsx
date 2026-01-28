"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Chip,
    Menu,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { getMyorders, updateOrderStatus } from "../services/myorders";
import SnackbarSimple from "@/app/(user)/Components/SnakeBar";

const ORDER_STATUSES = [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Returned",
];

const ORDER_STATUS_COLORS = {
    Pending: "default",          // gray
    Confirmed: "info",           // blue
    Packed: "secondary",         // purple
    Shipped: "primary",          // dark blue
    "Out for Delivery": "warning", // orange
    Delivered: "success",        // green
    Cancelled: "error",          // red
    Returned: "error",           // red
};


export const getStatusColor = (status) => {
    return ORDER_STATUS_COLORS[status] || "default";
};

export default function SellerOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updating, setUpdating] = useState(false)

    let total = 0

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const fetchOrders = async () => {
        try {
            const data = await getMyorders()
            setOrders(data.orders || []);
        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "Getting Order Feild!",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusClick = (event, order) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrder(order);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedOrder(null);
    };


    const handleStatusChange = async (newStatus) => {
        if (!selectedOrder) return;

        try {
            setUpdating(true);
            await updateOrderStatus({ selectedOrder, orderStatus: newStatus })

            // Update UI locally (no refetch needed)
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === selectedOrder._id
                        ? { ...order, orderStatus: newStatus }
                        : order
                )
            );
            setSnack({
                open: true,
                message: "Order Status Update successfully!",
                severity: "success",
            });
        } catch (error) {
            setSnack({
                open: true,
                message: error.mesaage || "Order Status Not updated |",
                severity: "error",
            });
        } finally {
            setUpdating(false);
            handleClose();
        }
    };

    if (loading)
        return <Typography variant="h6" color="secondary" sx={{ textAlign: "center", mt: 5 }}>Loading ...</Typography>;

    if (!orders.length)
        return <Typography variant="h5" color="secondary" sx={{ textAlign: "center", mt: 5 }}>Not Have Any Orders</Typography>

    if (orders) {
        orders.map((order) => {
            total = 0
            order.orderItems.map((item) => {
                total += item.price
            })
            order.totalPrice = total
        })
    }

    return (
        <>
            <div className="space-y-8">
                {orders.map((order) => (
                    <Card
                        key={order._id}
                        className="rounded-2xl shadow-sm hover:shadow-md transition m-5"
                    >
                        <CardContent className="space-y-5">

                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <Typography className="font-semibold text-gray-800">
                                        Order #{order._id.slice(-6)}
                                    </Typography>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <Chip
                                    label={order.orderStatus}
                                    color={getStatusColor(order.orderStatus)}
                                    size="small"
                                    onClick={(e) => handleStatusClick(e, order)}
                                    className="cursor-pointer"
                                />
                            </div>

                            <Divider />

                            {/* Products */}
                            <div className="space-y-4">
                                {order.orderItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4"
                                    >
                                        <Image
                                            src={item?.image?.url}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.qty}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-gray-800">
                                            ₹{item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Divider />

                            {/* Footer */}
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <p>
                                    Payment:{" "}
                                    <span className="font-medium text-gray-800">
                                        {order.paymentMethod}
                                    </span>
                                </p>
                                <p className="text-base font-semibold text-gray-900">
                                    ₹{order.totalPrice}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Status Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {ORDER_STATUSES.map((status) => (
                        <MenuItem
                            key={status}
                            disabled={
                                updating ||
                                status === selectedOrder?.orderStatus
                            }
                            onClick={() => handleStatusChange(status)}
                        >
                            {status}
                            {updating &&
                                status === selectedOrder?.orderStatus && (
                                    <CircularProgress size={14} className="ml-2" />
                                )}
                        </MenuItem>
                    ))}
                </Menu>
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
