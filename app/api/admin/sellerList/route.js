import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Seller from "@/models/seller";

export async function GET() {
    await connectDB();

    try {
        const sellers = await Seller.find()
            .populate("user", "name email") // select required fields only
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: sellers.length,
            data: sellers,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
