import { connectDB } from "@/lib/db"
import User from "@/models/user"
import { NextResponse } from "next/server";
export async function GET(req) {
    try {
        await connectDB();

        console.log("headers inside API:", req.headers);

        const userId = req.headers.get("userId");
        console.log("User ID from middleware:", userId);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log(user)
        return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
        console.log("api error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();

        const { name, email, userId } = await req.json();
        console.log(name, email, userId)
        if (!name || !email || !userId) {
            return NextResponse.json({ message: "All Feild Are Required", status: 400 })
        }

        const findExitUser = await User.findById(userId)

        if (!findExitUser) {
            return NextResponse.json({ message: "User Not Found" }, { status: 404 })
        }

        const chachEmail = await User.findOne({ email: email })

        if (chachEmail) {
            return NextResponse.json({ message: "This Email Already Exist Try Diffrent" }, { status: 400 })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true })

        if (!updatedUser) {
            return NextResponse.json({ message: "User Detail Not Updated" }, { status: 500 })
        }

        return NextResponse.json({
            user: {
                name: updatedUser?.name,
                email: updatedUser?.email,
                _id: updatedUser?._id
            }
        }, { status: 200 });

    } catch (error) {
        console.log("api error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}