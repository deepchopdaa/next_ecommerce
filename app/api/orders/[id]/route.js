import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params

        const order = await Order.findById({ id });

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ order }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = await params

        const { status } = await req.json();

        const validStatuses = [
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
            "Returned"
        ];

        if (!validStatuses.includes(status)) {
            return NextResponse.json({ message: "Invalid order status" }, { status: 400 });
        }

        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        order.orderStatus = status;

        if (status === "Delivered") {
            order.deliveredAt = new Date();
            order.paymentStatus = "Paid";
            order.paidAt = new Date();
        }

        await order.save();

        return NextResponse.json(
            { message: "Order updated", order },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params
        const deleteorder = await Order.findByIdAndDelete(id);

        if (!deleteorder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order deleted" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
