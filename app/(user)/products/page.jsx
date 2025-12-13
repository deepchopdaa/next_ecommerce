"use client"
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';
import CartButton from "../Components/CartButton"
import { fetchProducts } from '@/app/store/slices/productSlice';
import ProductFilter from '../Components/FilterSidebar';
export default function ProductList() {

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.products);
    const router = useRouter();
    // console.log(items, "products in product list redux api")

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    // console.log(items.products, "All items")
    if (loading) return <h1 className='text-center font-bold text-4xl mt-10'>Loading...</h1>;
    if (error) return <h2>Error: {error}</h2>;

    const sliderWidth = "min-w-30"
    const marginleft = "ml-10"

    return (
        <>
            <div className='flex'>

                <div className={`${sliderWidth} hidden lg:flex sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto`}>
                    <ProductFilter />
                </div>

                <div className={`${marginleft} flex-1`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4 ml- mt-10">

                        {items.products?.map((product) => {
                            const price = product.price;
                            const discountPrice = product.discountPrice;

                            const discountPercent =
                                price > 0
                                    ? Math.round(((price - discountPrice) / price) * 100)
                                    : 0;

                            return (
                                <div key={product._id} className="shadow-lg max-w-[345px]">
                                    <div onClick={() => router.push(`/products/${product._id}`)}>

                                        {/* Product Image */}
                                        <div className="w-full p-5 h-[240px] flex justify-center items-center bg-white rounded-lg overflow-hidden">
                                            {product?.image ? (
                                                <Image
                                                    src={`/uploads/${product.image}`}
                                                    alt="product"
                                                    width={345}
                                                    height={240}
                                                />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </div>
                                        <div className="p-4">

                                            <h2 className="text-lg font-semibold mb-1">
                                                {product.name} || {product.brand.name}
                                            </h2>

                                            <p className="text-lg font-bold text-green-600">
                                                ₹{product.discountPrice.toLocaleString()}
                                                {discountPercent > 0 && (
                                                    <span className="text-sm ml-3 font-semibold text-green-700">
                                                        {discountPercent}% OFF
                                                    </span>
                                                )}
                                            </p>

                                            <p className="text-sm line-through text-gray-500">
                                                ₹{product.price.toLocaleString()}
                                            </p>

                                            <p className="text-sm mt-1">
                                                ⭐ {product.rating} ({product.reviews} reviews)
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <div className="px-2 flex text-nowrap gap-2">
                                            <CartButton product={product} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    );

}