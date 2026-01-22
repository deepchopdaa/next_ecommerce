import Image from "next/image";
import PopulorProduct from "../../Components/Product";
import CartButton from "../../Components/CartButton";
import review from "@/models/review";
import { Suspense } from "react";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import ReviewForm from "../../Components/reviews";
export const revalidate = 60;
export async function generateStaticParams() {
    await connectDB();
    const products = await Product.find().select("_id");
    return products.map((p) => ({
        id: p._id.toString(),
    }));
}

export default async function Page({ params }) {
    const { id } = await params;
    async function fetchProduct() {
        try {
            await connectDB();
            const product = await Product.findById(id);
            return JSON.parse(JSON.stringify(product));
        } catch (error) {
            console.log("Error fetching product:", error);
            return null;
        }
    }
    async function fetchReviews(id) {
        try {
            await connectDB();
            console.log(id, "product id");

            const reviews = await review
                .find({ productId: id })
                .populate("userId", "name")
                .lean();

            // Calculate average rating
            const reviewCount = reviews.length;

            const avgRating =
                reviewCount > 0
                    ? Number(
                        (
                            reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                            reviewCount
                        ).toFixed(1)
                    )
                    : 0;

            return {
                reviews,
                avgRating,
                reviewCount,
            };
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return {
                reviews: [],
                avgRating: 0,
                reviewCount: 0,
            };
        }
    }

    const product = await fetchProduct();
    const { reviews, avgRating, reviewCount } = await fetchReviews();

    const price = product.price;
    const discountPrice = product.discountPrice;

    console.log(reviews, "reviews of the product !")

    const discountPercent =
        price > 0
            ? Math.round(((price - discountPrice) / price) * 100)
            : 0;

    if (!product) return <p>Product not found!</p>;

    return (
        <>
            <div className="lg:flex w-full">
                <Image
                    alt={product?.name}
                    src={product?.image}
                    width={500}
                    height={500}
                    className="object-contain mx-auto mt-10"
                />

                <div className="ml-10 mt-10">
                    <h1 className="text-3xl font-bold mt-10">
                        {product?.name}
                    </h1>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-10">
                        {product?.description}
                    </h1>
                    <h1 className="text-3xl font-bold mt-5">
                        {product?.brand?.name}
                    </h1>
                    <h1 className="text-3xl font-bold mt-5">
                        {product?.category?.name}
                    </h1>
                    <p className="mt-2">
                        Price: ₹{product?.discountPrice?.toLocaleString()}
                        {discountPercent > 0 && (
                            <span className="text-sm ml-3 font-semibold text-green-700">
                                {discountPercent}% OFF
                            </span>
                        )}
                    </p>
                    <p className="mt-2 line-through">
                        ₹{product?.price?.toLocaleString()}
                    </p>

                    <p className="mt-2">
                        Rating: ⭐ {avgRating} ({reviewCount} reviews)
                    </p>

                    <div className="flex gap-4 mt-6">
                        <CartButton product={product} />
                    </div>
                </div>
            </div>

            <Suspense fallback={<h1 className="text-center mt-10 font-sbold text-3xl">Reviews Loading ...</h1>}>
                <ReviewForm reviews={reviews} productId={product._id} />
            </Suspense>

            <Suspense fallback={<h1 className="text-center mt-10 font-sbold text-3xl">Products Loading ...</h1>}>
                <PopulorProduct />
            </Suspense>
        </>
    );
}
