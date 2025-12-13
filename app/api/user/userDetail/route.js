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
