import cloudinary from "@/app/utility/cloudinary"
import { connectDB } from "@/lib/db"
import Product from "@/models/product"
import Seller from "@/models/seller"
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"
export async function POST(req) {
    try {
        await connectDB();
        console.log("POST product API called");

        const userId = req.headers.get("userId");
        if (!userId) {
            return NextResponse.json(
                { message: "User not authenticated" },
                { status: 401 }
            );
        }

        const checkSeller = await Seller.findOne({ user: userId });
        if (!checkSeller) {
            return NextResponse.json(
                { message: "Seller not found" },
                { status: 404 }
            );
        }

        const formData = await req.formData();

        const name = formData.get("name");
        const branch = formData.get("branch");
        const price = formData.get("price");
        const brand = formData.get("brand");
        const discountPrice = formData.get("discountPrice");
        const description = formData.get("description");
        const category = formData.get("category");
        const stock = formData.get("stock");
        const file = formData.get("image");

        if (!branch || !file) {
            return NextResponse.json(
                { message: "Branch and image are required" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "ecommerce/products",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });

        const newProduct = await Product.create({
            name,
            sellerId: checkSeller._id,
            branch,
            price,
            brand,
            discountPrice,
            description,
            category,
            stock,
            image: {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            },
        });

        return NextResponse.json(
            {
                message: "Product created successfully",
                product: newProduct,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Product create error:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    {
        try {
            await connectDB()

            const userId = req.headers.get("userId");
            console.log(userId, "userID")

            const seller = await Seller.findOne({ user: userId })

            console.log(seller, "check seller")

            const products = await Product.find({ sellerId: seller?._id }, null, { sort: { createdAt: -1 } })
                .populate([
                    { path: "category", select: "name" },
                    { path: "brand", select: "name" },
                    { path: "branch", select: "branchName" }
                ]);
            return NextResponse.json(
                { products: products },
                { status: 200 }
            )

        } catch (error) {
            return NextResponse.json({ message: "Server error" }, { status: 500 })
        }
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");

        if (!productId) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        // Delete image from Cloudinary if exists
        if (existingProduct.image?.public_id) {
            try {
                await cloudinary.uploader.destroy(existingProduct.image.public_id);
                console.log("Cloudinary image deleted");
            } catch (err) {
                console.warn("Cloudinary delete skipped:", err.message);
            }
        }

        // Delete product from DB
        await Product.findByIdAndDelete(productId);

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Delete product error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");

        if (!productId) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        const formData = await req.formData();

        const name = formData.get("name");
        const price = formData.get("price");
        const brand = formData.get("brand");
        const branch = formData.get("branch");
        const discountPrice = formData.get("discountPrice");
        const description = formData.get("description");
        const category = formData.get("category");
        const stock = formData.get("stock");
        const file = formData.get("image");

        let image = existingProduct.image;

        // If new image uploaded
        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload new image to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "ecommerce/products",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    }
                ).end(buffer);
            });

            // Delete old image from Cloudinary
            if (existingProduct.image?.public_id) {
                try {
                    await cloudinary.uploader.destroy(existingProduct.image.public_id);
                } catch (err) {
                    console.warn("Old Cloudinary image delete skipped:", err.message);
                }
            }

            image = {   
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            };
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                brand,
                branch,
                discountPrice,
                description,
                category,
                stock,
                image,
            },
            { new: true }
        );

        return NextResponse.json(
            { message: "Product updated successfully", product: updatedProduct },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update product error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
