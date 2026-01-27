"use client";

import React, { useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchBrands } from "../../store/slices/categoryBrandSlice";

import { fetchProducts, setFilter } from "@/app/store/slices/productSlice";
import Slider from "@mui/material/Slider";

export default function ProductFilter() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    const filters = useSelector((state) => state.products.filters);
    const { categories, brands, loading } = useSelector(
        (state) => state.categoryBrand
    );

    /* ---------------- Debounced Fetch ---------------- */
    const debouncedFetch = useCallback(
        debounce(() => {
            dispatch(fetchProducts());
        }, 600),
        [dispatch]
    );

    useEffect(() => {
        debouncedFetch();
        return () => debouncedFetch.cancel();
    }, [
        filters.category,
        filters.brand,
        filters.minprice,
        filters.maxprice
    ]);

    const updateFilter = (key, value) => {
        dispatch(setFilter({ key, value }));
    };

    const toggleMultiSelect = (key, id, checked) => {
        const updated = checked
            ? [...filters[key], id]
            : filters[key].filter((item) => item !== id);

        updateFilter(key, updated);
    };

    return (
        <div className="p-5 rounded-xl w-64 ">
            <h3 className="font-bold text-xl mb-4">Filters</h3>

            {/* CATEGORY */}
            <h4 className="font-semibold mb-2 text-sm">Category</h4>
            {loading && <p className="text-xs text-gray-400">Loading...</p>}
            {categories?.map((cat) => (
                <label key={cat._id} className="flex gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={filters.category.includes(cat._id)}
                        onChange={(e) =>
                            toggleMultiSelect(
                                "category",
                                cat._id,
                                e.target.checked
                            )
                        }
                    />
                    {cat.name}
                </label>
            ))}

            <hr className="my-4" />

            {/* BRAND */}
            <h4 className="font-semibold mb-2 text-sm">Brand</h4>
            {brands?.map((brand) => (
                <label key={brand._id} className="flex gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={filters.brand.includes(brand._id)}
                        onChange={(e) =>
                            toggleMultiSelect(
                                "brand",
                                brand._id,
                                e.target.checked
                            )
                        }
                    />
                    {brand.name}
                </label>
            ))}

            <hr className="my-4" />

            {/* PRICE */}
            <h4 className="font-semibold mb-2 text-sm">Price</h4>
            <Slider
                min={0}
                max={50000}
                color="info"
                value={[
                    Number(filters.minprice) || 0,
                    Number(filters.maxprice) || 50000
                ]}
                onChange={(e, value) => {
                    updateFilter("minprice", value[0]);
                    updateFilter("maxprice", value[1]);
                }}
                valueLabelDisplay="auto"
            />
        </div>
    );
}
