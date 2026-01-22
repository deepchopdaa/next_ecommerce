import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Branch from "@/models/branch";

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const branch = await Branch.create(body);

        return NextResponse.json({
            success: true,
            data: branch,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    await connectDB();
    try {
        const body = await req.json();
        const { sellerId, branchId } = body;

        await Branch.updateMany(
            { sellerId },
            { $set: { primary: false } }
        );

        await Branch.findByIdAndUpdate(branchId, {
            primary: true,
        });

        return NextResponse.json({ message: "Primary branch updated successfully" })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }

}