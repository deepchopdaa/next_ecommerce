"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import CartButton from "../Components/CartButton";
import ProductFilter from "../Components/FilterSidebar";
import { fetchProducts } from "@/app/store/slices/productSlice";

import ProductChatbot from "../Components/ChatBot";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
export default function ProductList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [openFilter, setOpenFilter] = useState(false);
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

    if (loading) {
        <h2 className="text-center font-bold text-4xl mt-10">
            Loading ...
        </h2>
    }

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div
                    className="hidden md:block sticky top-24 h-[calc(100vh-120px)] overflow-y-auto w-[280px]">
                    <ProductFilter />
                </div>
                {/* MOBILE FLOATING BUTTON */}
                <button
                    onClick={() => setOpenFilter(true)}
                    className="lg:hidden fixed bottom-20 left-5 z-20 bg-black text-white p-4 rounded-full shadow-lg"
                >
                    <TuneIcon />
                </button>

                {/* MOBILE SLIDE-IN SIDEBAR */}
                {openFilter && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setOpenFilter(false)}
                        />

                        {/* Sidebar */}
                        <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl p-4 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">Filters</h3>
                                <button onClick={() => setOpenFilter(false)}>
                                    <CloseIcon />
                                </button>
                            </div>

                            <ProductFilter />
                        </div>
                    </div>
                )}

                {/* Product List */}
                <div className="flex-1 ml-10">
                    {products.length === 0 ? (
                        <h2 className="text-center font-bold text-4xl mt-10">
                            Loading ...
                        </h2>
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-4 mt-10">
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
                                            className="shadow-lg "
                                        >
                                            <div
                                                onClick={() =>
                                                    router.push(`/products/${product._id}`)
                                                }
                                                className="cursor-pointer"
                                            >
                                                {/* Image */}
                                                <div className="w-full p-5 h-60 flex justify-center items-center bg-white rounded-lg">
                                                    {product?.image ? (
                                                        <Image
                                                            src={product.image.url}
                                                            alt={product.name}
                                                            width={345}
                                                            height={240}
                                                            className="object-contain w-full h-60"
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
