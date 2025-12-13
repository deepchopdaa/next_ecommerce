import { connectDB } from "@/lib/db"
import Product from "@/models/product"
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"
export async function POST(req) {

    try {
        await connectDB()
        console.log("post api called");
        const formData = await req.formData();
        console.log("Received form data", formData);
        // return Response.json({ message: "Post api called", formData }, { status: 200 })
        const name = formData.get('name');
        const price = formData.get('price');
        const brand = formData.get('brand');
        const discountPrice = formData.get('discountPrice');
        const description = formData.get('description');
        const category = formData.get('category');
        const stock = formData.get('stock');

        console.log(name, "name of the product")

        console.log("request body", name, price, brand, discountPrice, description, category, stock);

        const file = formData.get('image');
        console.log('Received file:', file.name);

        if (!file) {
            return new NextResponse(JSON.stringify({ success: false }, { message: 'No file uploaded' }), { status: 400 });
        }

        const bytedata = await file.arrayBuffer();
        const buffer = Buffer.from(bytedata);
        fs.writeFileSync(`./public/uploads/${file.name}`, buffer);

        const newProduct = await Product.create({
            name,
            price,
            brand,
            discountPrice,
            description,
            category,
            image: file.name,
            stock
        })

        return NextResponse.json(
            { message: "Product created successfully", product: newProduct },
            { status: 201 }
        )

    } catch (error) {
        console.log("error = ", error)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}

export async function GET(req) {
    {
        try {
            await connectDB()
            const products = await Product.find({}, null, { sort: { createdAt: -1 } })
                .populate([
                    { path: "category", select: "name" },
                    { path: "brand", select: "name" }
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
        await connectDB()
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");
        if (!productId) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            )
        }

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            )
        }

        const filePath = path.join(process.cwd(), "public", "uploads", existingProduct.image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // delete the file
            console.log({ success: true, message: "File deleted" });
        } else {
            console.log({ success: false, message: "File not found" });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}

export async function PUT(req) {

    try {
        await connectDB()
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");
        const formData = await req.formData()

        if (!productId) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            )
        }

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            )
        }

        const name = formData.get('name');
        const price = formData.get('price');
        const brand = formData.get('brand');
        const discountPrice = formData.get('discountPrice');
        const description = formData.get('description');
        const category = formData.get('category');
        const stock = formData.get('stock');
        const file = formData.get('image');
        console.log('Received file:', file.name);

        if (file) {
            const bytedata = await file.arrayBuffer();
            const buffer = Buffer.from(bytedata);
            fs.writeFileSync(`./public/uploads/${file.name}`, buffer);
        }

        if (file) {
            const filePath = path.join(process.cwd(), "public", "uploads", existingProduct.image);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // delete the file
                console.log({ success: true, message: "File deleted" });
            } else {
                console.log({ success: false, message: "File not found" });
            }
        }
        const image = file ? file.name : existingProduct.image;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                brand,
                discountPrice,
                description,
                category,
                image: image,
                stock
            },
            { new: true }
        )
        if (!updatedProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: "Product updated successfully", product: updatedProduct },
            { status: 200 }
        )
    }
    catch (error) {
        console.log("error = ", error)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}

