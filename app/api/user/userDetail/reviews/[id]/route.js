import { NextResponse } from "next/server";
import Review from "@/models/review";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params
        const reviews = await Review.find({ productId: id })
            .populate("userId", "name")
            .populate("productId", "name");

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
