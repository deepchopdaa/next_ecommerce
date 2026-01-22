import { NextResponse } from "next/server";
import Seller from "@/models/seller";
import Branch from "@/models/branch";
import { connectDB } from "@/lib/db";

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { seller, branches } = body;

        const userId = req.headers.get("userId");
        console.log(userId, "userID")

        if (!seller || !branches || branches.length === 0) {
            return NextResponse.json(
                { success: false, message: "Seller and branches are required" },
                { status: 400 }
            );
        }

        // 🔹 Create Seller
        const createdSeller = await Seller.create({
            user: userId, // get from auth later
            accountName: seller.accountName
        });

        const sellerId = createdSeller._id;

        // 🔹 Create Branches
        const branchDocs = branches.map((branch, index) => ({
            sellerId: sellerId,
            branchName: branch.branchName,
            address: branch.address,
            city: branch.city,
            state: branch.state,
            country: branch.country,
            pincode: branch.pincode,
            primary: index === 0
        }));

        await Branch.insertMany(branchDocs);

        return NextResponse.json(
            {
                success: true,
                message: "Seller and branches created successfully",
                sellerId
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}


export async function GET(req, { params }) {
    await connectDB();

    try {
        const userId = req.headers.get("userId");
        console.log("User ID from middleware:", userId);

        // 🔹 Get Seller
        const seller = await Seller.findOne({ user: userId }).populate("user", "name email")
        if (!seller) {
            return NextResponse.json(
                { success: false, message: "Seller not found" },
                { status: 404 }
            );
        }

        // 🔹 Get Seller Branches
        const branches = await Branch.find({ sellerId: seller?._id });

        return NextResponse.json(
            {
                success: true,
                data: {
                    seller,
                    branches
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

