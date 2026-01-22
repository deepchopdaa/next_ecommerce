import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import Product from "@/models/product";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await connectDB();

        const userId = req.headers.get("userId");
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { orderItems, shippingAddress, paymentMethod = "COD" } = body;

        if (!orderItems?.length) {
            return NextResponse.json(
                { message: "Order items required" },
                { status: 400 }
            );
        }

        let itemsPrice = 0;
        const validatedItems = [];

        for (const item of orderItems) {
            const product = await Product.findOneAndUpdate(
                {
                    _id: item.product,
                    stock: { $gte: item.qty },
                },
                {
                    $inc: { stock: -item.qty },
                },
                { new: true }
            );

            if (!product) {
                throw new Error("Product out of stock");
            }

            itemsPrice += product.price * item.qty;

            validatedItems.push({
                product: product._id,
                name: product.name,
                image: product?.image || "",
                qty: item.qty,
                price: product.price,
                sellerId: product.sellerId,
            });
        }

        const shippingPrice = itemsPrice > 1000 ? 0 : 50;
        const taxPrice = Math.round(itemsPrice * 0.18);
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        const order = await Order.create({
            user: userId,
            orderItems: validatedItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });

        return NextResponse.json(
            { message: "Order placed successfully", order },
            { status: 201 }
        );

    } catch (error) {
        console.error("Order Create Error:", error.message);

        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
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
