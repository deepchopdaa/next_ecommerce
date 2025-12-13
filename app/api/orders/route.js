import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const userId = req.headers.get("userId");
        console.log(userId, "userID")

        const order = await Order.create({ ...body, user: userId });

        if (!order) {
            return NextResponse.json({ message: "Order not Created" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Order created successfully", order },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function GET(req) {
    try {
        await connectDB();

        const userId = req.headers.get("userId");
        console.log(userId, "userID")

        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        if (!orders) {
            return NextResponse.json({ message: "Order not Created" }, { status: 404 });
        }
        return NextResponse.json({ orders }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
