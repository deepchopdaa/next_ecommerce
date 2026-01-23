"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import CartButton from "../Components/CartButton";
import ProductFilter from "../Components/FilterSidebar";
import { fetchProducts } from "@/app/store/slices/productSlice";
import CircularProgress from '@mui/material/CircularProgress';
import ProductChatbot from "../Components/ChatBot";
export default function ProductList() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { items, loading, error } = useSelector(
        (state) => state.products
    );

    const ITEMS_PER_LOAD = 6;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const fetchMore = () => {
        setTimeout(() => {
            setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
        }, 1500);
    };

    if (error) return <h2>Error: {error}</h2>;

    const products = items?.products || [];
    const visibleProducts = products.slice(0, visibleCount);

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div className="hidden lg:flex sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto min-w-[280px]">
                    <ProductFilter />
                </div>

                {/* Product List */}
                <div className="flex-1 ml-10">
                    {loading && products.length === 0 ? (
                        <h1 className="text-center font-bold text-4xl mt-10">
                            Loading...
                        </h1>
                    ) : (
                        <InfiniteScroll
                            dataLength={visibleProducts.length}
                            next={fetchMore}
                            hasMore={visibleCount < products.length}
                            loader={
                                <h4 className="text-center my-6">Loading more...</h4>
                            }
                            endMessage={
                                <p className="text-center my-6 font-semibold">
                                    All products loaded
                                </p>
                            }
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 mt-10">
                                {visibleProducts.map((product) => {
                                    const discountPercent =
                                        product.price > 0
                                            ? Math.round(
                                                ((product.price - product.discountPrice) /
                                                    product.price) *
                                                100
                                            )
                                            : 0;

                                    return (
                                        <div
                                            key={product._id}
                                            className="shadow-lg max-w-[345px]"
                                        >
                                            <div
                                                onClick={() =>
                                                    router.push(`/products/${product._id}`)
                                                }
                                                className="cursor-pointer"
                                            >
                                                {/* Image */}
                                                <div className="w-full p-5 h-[240px] flex justify-center items-center bg-white rounded-lg">
                                                    {product?.image ? (
                                                        <Image
                                                            src={product.image.url}
                                                            alt={product.name}
                                                            width={345}
                                                            height={240}
                                                            className="object-contain w-full h-[240px]"
                                                        />
                                                    ) : (
                                                        <span>No Image</span>
                                                    )}
                                                </div>

                                                {/* Details */}
                                                <div className="p-4">
                                                    <h2 className="text-lg font-semibold mb-1">
                                                        {product.name} | {product?.brand?.name}
                                                    </h2>

                                                    <p className="text-lg font-bold text-green-600">
                                                        ₹{product.discountPrice.toLocaleString()}
                                                        {discountPercent > 0 && (
                                                            <span className="text-sm ml-3 text-green-700">
                                                                {discountPercent}% OFF
                                                            </span>
                                                        )}
                                                    </p>

                                                    <p className="text-sm line-through text-gray-500">
                                                        ₹{product.price.toLocaleString()}
                                                    </p>

                                                    <p className="text-sm mt-1">
                                                        ⭐ {product?.avgRating} ({product?.reviewCount} reviews)
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Cart Button */}
                                            <div className="px-2 mb-4">
                                                <CartButton product={product} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </InfiniteScroll>
                    )}
                </div>
            </div>
            <ProductChatbot />
        </>
    );
}
