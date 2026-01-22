import { NextResponse } from "next/server";
import Seller from "@/models/seller";
import Branch from "@/models/branch";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { seller, branches } = body;
        console.log(req.headers)
        const userId = req.headers.get("Authorization");
        console.log(userId, "userId")
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Not authorize !" },
                { status: 400 }
            )
        }
        console.log(userId, "userID")

        if (!seller || !branches || branches.length === 0) {
            return NextResponse.json(
                { success: false, message: "Seller and branches are required" },
                { status: 400 }
            );
        }

        // 🔹 Create Seller
        const createdSeller = await Seller.create({
            user: new mongoose.Types.ObjectId(userId), // get from auth later
            accountName: seller.accountName
        });
        console.log(createdSeller, "created Seller")
        const sellerId = createdSeller._id;

        // 🔹 Create Branches
        const branchDocs = branches.map((branch, index) => ({
            sellerId: sellerId,
            branchName: branch.branchName,
            address: branch.address,
            contactNo: branch.contactNo,
            city: branch.city,
            state: branch.state,
            country: branch.country,
            pincode: branch.pincode,
            primary: index === 0
        }));
        console.log(branchDocs, "branch docs")

        const createdbranches = await Branch.insertMany(branchDocs);
        console.log(createdbranches)
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



