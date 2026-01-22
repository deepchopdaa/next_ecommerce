import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Branch from "@/models/branch";

export async function DELETE(req, { params }) {
    await connectDB();

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Branch ID is required" },
                { status: 400 }
            );
        }

        const branch = await Branch.findByIdAndDelete(id);

        if (!branch) {
            return NextResponse.json(
                { success: false, message: "Branch not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Branch deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
