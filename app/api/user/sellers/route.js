import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Seller from "@/models/seller";
import "@/models/user";

export async function GET() {
    await connectDB();
    try {
        const sellers = await Seller.find().populate("user", "name email")

        if (!sellers) {
            return NextResponse.json({ message: "Sellers Not Found !" }, { status: 200 })
        }

        return NextResponse.json({ sellers }, { status: 200 });

    } catch (error) {
        console.log("Seller List Api Error", error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
