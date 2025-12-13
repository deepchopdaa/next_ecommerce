import Category from "@/models/category";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json(categories);
}


export async function POST(req) {
    await connectDB();
    const data = await req.json();
    try {
        const newCategory = await Category.create(data);
        return NextResponse.json(newCategory);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}   