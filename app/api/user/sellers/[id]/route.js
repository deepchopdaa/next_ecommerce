import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Seller from "@/models/seller";
import Branch from "@/models/branch";

export async function GET(req, { params }) {
    await connectDB();
    try {

        const { id } = await params;

        const seller = await Seller.findById(id);

        if (!seller) {
            return NextResponse.json({ message: "Seller Not Found !" }, { status: 200 })
        }

        const branches = await Branch.find({ sellerId: id });

        if (!branches) {
            return NextResponse.json({ message: "There Is Not Have Any Branches of Seller" }, { status: 200 })
        }

        return NextResponse.json({ seller, branches });

    } catch (error) {
        console.log("Branches Get of Seller Error :", error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
