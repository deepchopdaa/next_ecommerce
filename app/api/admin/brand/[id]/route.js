import { connectDB } from "@/lib/db";
import Brand from "@/models/brand";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    await connectDB();
    const { id } = await params

    const brand = await Brand.findById(id);
    return NextResponse.json(brand);
}
export async function PUT(req, { params }) {
    await connectDB();
    const { id } = await params
    const data = await req.json();

    try {
        const updated = await Brand.findByIdAndUpdate(id, data, {
            new: true,
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
export async function DELETE(req, { params }) {
    await connectDB();
    const { id } = await params
    await Brand.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted Successfully" });
}