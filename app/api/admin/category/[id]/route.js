import { connectDB } from "@/lib/db";
import Category from "@/models/category";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    await connectDB();
    const { id } = await params

    const category = await Category.findById(id);
    return NextResponse.json(category);
}
export async function PUT(req, { params }) {
    await connectDB();
    const { id } = await params
    const data = await req.json();

    try {
        const updated = await Category.findByIdAndUpdate(id, data, {
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
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted Successfully" });
}