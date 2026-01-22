import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Seller from "@/models/seller";
import User from "@/models/user";

export async function PUT(req, { params }) {
    await connectDB();

    try {
        const { id } = await params;
        console.log(id, "id for profile update")
        const body = await req.json();

        const { accountName, userName, userEmail } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Seller ID is required" },
                { status: 400 }
            );
        }

        const seller = await Seller.findById(id);
        if (!seller) {
            return NextResponse.json(
                { success: false, message: "Seller not found" },
                { status: 404 }
            );
        }

        if (accountName) {
            seller.accountName = accountName;
            await seller.save();
        }

        if (seller.user) {
            const user = await User.findById(seller.user);

            if (!user) {
                return NextResponse.json(
                    { success: false, message: "User not found" },
                    { status: 404 }
                );
            }

            if (userName) user.name = userName;
            if (userEmail) user.email = userEmail;

            await user.save();
        }

        return NextResponse.json(
            {
                success: true,
                message: "Seller and User updated successfully",
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
