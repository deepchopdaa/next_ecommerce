import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import Seller from "@/models/seller";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        await connectDB();

        // 🔹 Get userId from headers
        const userId = req.headers.get("userId");
        if (!userId) {
            return NextResponse.json(
                { message: "UserId missing" },
                { status: 400 }
            );
        }

        // 🔹 Find seller using userId
        const checkSeller = await Seller.findOne({ user: userId });
        if (!checkSeller) {
            return NextResponse.json(
                { message: "Seller not found" },
                { status: 404 }
            );
        }

        const sellerId = new mongoose.Types.ObjectId(checkSeller._id);

        // 🔹 Get orders where THIS seller has products
        const orders = await Order.aggregate([
            // 1️⃣ Match orders containing this seller's items
            {
                $match: {
                    "orderItems.sellerId": sellerId,
                },
            },

            // 2️⃣ Keep ONLY this seller's order items
            {
                $addFields: {
                    orderItems: {
                        $filter: {
                            input: "$orderItems",
                            as: "item",
                            cond: { $eq: ["$$item.sellerId", sellerId] },
                        },
                    },
                },
            },

            // 3️⃣ Latest orders first
            {
                $sort: { createdAt: -1 },
            },
        ]);


        console.log(orders, "orders for this seller")

        return NextResponse.json(
            { orders },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
