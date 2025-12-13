import { connectDB } from "@/lib/db";
import product from "@/models/product";

export async function GET(req, { params }) {
    {
        try {
            const { id } = await params;
            console.log(id, "product id");
            await connectDB()
            const products = await product.findById({ _id: id }).populate([
                { path: "category", select: "name" }
            ]);

            return Response.json(
                { products: products },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    }
                },
                { status: 200 }
            )
        } catch (error) {
            return Response.json({ message: "Server error" }, { status: 500 })
        }
    }
}