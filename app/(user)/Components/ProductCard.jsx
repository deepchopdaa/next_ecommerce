"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import CartButton from "./CartButton";

const ProductCard = ({ product }) => {
    const router = useRouter();

    const price = product?.price || 0;
    const discountPrice = product?.discountPrice || price;

    const discountPercent =
        price > 0
            ? Math.round(((price - discountPrice) / price) * 100)
            : 0;

    return (
        <div className="max-w-[345px] rounded-xl bg-white shadow-lg transition hover:shadow-xl">
            {/* Clickable Area */}
            <div
                onClick={() => router.push(`/products/${product._id}`)}
                className="cursor-pointer"
            >
                {/* Product Image */}
                <div className="flex h-[240px] items-center justify-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                    {product?.image ? (
                        <Image
                            src={product.image?.url}
                            alt={product?.name}
                            width={345}
                            height={240}
                            className="object-contain"
                        />
                    ) : (
                        <span className="text-sm text-gray-400">No Image</span>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h2 className="mb-1 line-clamp-2 text-lg font-semibold">
                        {product?.name}
                    </h2>

                    <p className="text-sm text-gray-500 mb-2">
                        {product?.brand?.name}
                    </p>

                    {/* Price */}
                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">
                            ₹{discountPrice.toLocaleString()}
                        </span>

                        {discountPercent > 0 && (
                            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                {discountPercent}% OFF
                            </span>
                        )}
                    </div>

                    {discountPercent > 0 && (
                        <p className="text-sm text-gray-400 line-through">
                            ₹{price.toLocaleString()}
                        </p>
                    )}

                    {/* Rating */}
                    <p className="mt-2 text-sm text-gray-600">
                        ⭐ {product?.rating || 0} ({product?.reviews || 0} reviews)
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4">
                <CartButton product={product} />
            </div>
        </div>
    );
};

export default ProductCard;
