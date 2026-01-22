import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

const ORDER_STATUSES = [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Returned"
];

export async function PATCH(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const { orderStatus } = await req.json();

        // Validate status
        if (!ORDER_STATUSES.includes(orderStatus)) {
            return NextResponse.json(
                { message: "Invalid order status" },
                { status: 400 }
            );
        }

        // Find order
        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        if (orderStatus === "Delivered") {
            order.paymentStatus = "Paid"
        }

        if (orderStatus === "Cancelled") {
            order.paymentStatus = "Failed"
        }

        if (orderStatus === "Returned") {
            order.paymentStatus = "Refunded"
        }

        // Update status
        order.orderStatus = orderStatus;
        await order.save();

        return NextResponse.json({
            success: true,
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        console.error("Update order status error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
