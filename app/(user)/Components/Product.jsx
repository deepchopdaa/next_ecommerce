"use client"
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CartButton from '@/app/(user)/Components/CartButton';
import { useRouter } from "next/navigation";
import { fetchProducts } from '@/app/store/slices/productSlice';

const page = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { items, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);


    if (error) return <h2>Error: {error}</h2>;

    return (
        <>
            <div className="ml-5 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-10">
                {items?.products?.slice(0, 4).map((product) => (
                    <div key={product?._id} className="shadow-lg max-w-[345px]">
                        <div onClick={() => router.push(`/products/${product?._id}`)}>

                            {/* Product Image */}
                            <div className="w-full h-[240px] flex justify-center items-center bg-white rounded-lg overflow-hidden">
                                <Image
                                    src={`/uploads/${product?.image}`}
                                    alt={product?.name}
                                    width={345}
                                    height={240}
                                    className="object-contain w-full h-[240px]"
                                />
                            </div>
                            <div className="p-4">

                                <h2 className="text-lg font-semibold mb-1">
                                    {product.name}
                                </h2>

                                <p className="text-lg font-bold text-green-600">
                                    ₹{product.discountPrice.toLocaleString()}
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
                ))}
            </div>
        </>
    )
}

export default page
