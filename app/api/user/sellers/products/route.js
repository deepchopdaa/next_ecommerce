import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export async function GET(req) {
    await connectDB();

    try {

        const { searchParams } = new URL(req.url);
        const sellerId = searchParams.get("sellerId");
        const branchId = searchParams.get("branchId");

        const filter = { sellerId };
        if (branchId) filter.branch = branchId;

        const products = await Product.find(filter);

        if (!products) {
            return NextResponse.json({ message: "This Seller and Branch Product Not Found !" }, { status: 200 })
        }

        return NextResponse.json({ products });

    } catch (error) {
        console.log("Product Getting Error of The Seller :", error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
