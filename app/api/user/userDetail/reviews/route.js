import { NextResponse } from "next/server";
import Review from "@/models/review";
import Product from "@/models/product";
import User from "@/models/user";
import { connectDB } from "@/lib/db";

export async function POST(req) {
    try {

        await connectDB();
        const { rating, comment, productId } = await req.json();
        const userId = req.headers.get("userId");
        console.log(userId, "userID")

        if (!userId) {
            return NextResponse.json({ message: "User Not Found", status: 404 })
        }

        const FindExistReview = await Review.findOne({ userId: userId, productId: productId })
        console.log(FindExistReview, "get already added review product of the user")
        if (FindExistReview) {
            return NextResponse.json({ message: "You Already Added Review" }, { status: 400 })
        }

        const review = await Review.create({ userId, productId, rating, comment });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.log("Review Getting Error : ", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const reviews = await Review.find()
            .populate("userId", "name email")
            .populate("productId", "name");
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
