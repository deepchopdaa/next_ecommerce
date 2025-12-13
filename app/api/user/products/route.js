import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        let category = searchParams.get("category") || null;
        let brand = searchParams.get("brand") || null;
        let minprice = searchParams.get("minprice") || null;
        let maxprice = searchParams.get("maxprice") || null;


        // Build Filter Object
        const filter = {};

        if (category) {
            category = category.split(",");
        }

        if (brand) {
            brand = brand.split(",");
        }

        if (category && Array.isArray(category) && category.length > 0) {
            filter.category = { $in: category };
        }

        // BRAND FILTER (array support)
        if (brand && Array.isArray(brand) && brand.length > 0) {
            filter.brand = { $in: brand };
        }

        console.log(brand, "brand")

        if (minprice || maxprice) {
            filter.discountPrice = {};

            if (minprice) {
                filter.discountPrice.$gte = Number(minprice);
            }
            if (maxprice) {
                filter.discountPrice.$lte = Number(maxprice);
            }
        }

        /* filter for the products */
        console.log(filter, "filter for the products ...................................")

        // Fetch Products
        const products = await Product.find(filter).sort({ createdAt: -1 }).populate([
            { path: "category", select: "name" },
            { path: "brand", select: "name" }
        ]);

        return Response.json(
            { products },
            {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
            }
        );

    } catch (error) {
        console.error("Product fetch error:", error);
        return Response.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}
