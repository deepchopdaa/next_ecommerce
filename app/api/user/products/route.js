import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        let search = searchParams.get("search") || null;
        let category = searchParams.get("category") || null;
        let brand = searchParams.get("brand") || null;
        let minprice = searchParams.get("minprice") || null;
        let maxprice = searchParams.get("maxprice") || null;

        /* ---------------- BUILD FILTER (UNCHANGED LOGIC) ---------------- */
        const filter = {};

        if (category) category = category.split(",");
        if (brand) brand = brand.split(",");

        if (category?.length) {
            filter.category = { $in: category };
        }

        if (brand?.length) {
            filter.brand = { $in: brand };
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (minprice || maxprice) {
            filter.discountPrice = {};
            if (minprice) filter.discountPrice.$gte = Number(minprice);
            if (maxprice) filter.discountPrice.$lte = Number(maxprice);
        }

        /* ---------------- STEP 1: FIND PRODUCTS (CAST SAFE) ---------------- */
        const baseProducts = await Product.find(filter)
            .select("_id")
            .lean();

        const productIds = baseProducts.map(p => p._id);

        if (!productIds.length) {
            return Response.json({ products: [] }, { status: 200 });
        }

        /* ---------------- STEP 2: AGGREGATE REVIEWS ---------------- */
        const products = await Product.aggregate([
            {
                $match: {
                    _id: { $in: productIds }
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "productId",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    avgRating: {
                        $cond: [
                            { $gt: [{ $size: "$reviews" }, 0] },
                            { $round: [{ $avg: "$reviews.rating" }, 1] },
                            0
                        ]
                    },
                    reviewCount: { $size: "$reviews" }
                }
            },
            {
                $project: {
                    reviews: 0
                }
            },
            { $sort: { createdAt: -1 } }
        ]);

        /* ---------------- STEP 3: POPULATE ---------------- */
        const populatedProducts = await Product.populate(products, [
            { path: "category", select: "name" },
            { path: "brand", select: "name" }
        ]);

        return Response.json(
            { products: populatedProducts },
            {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type, Authorization"
                }
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
