import Brand from "@/models/brand";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
    await connectDB();
    const brands = await Brand.find();
    return NextResponse.json(brands);
}


export async function POST(req) {
    await connectDB();
    const data = await req.json();
    try {
        const newBrand = await Brand.create(data);
        return NextResponse.json(newBrand);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}   