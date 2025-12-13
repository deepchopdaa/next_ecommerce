"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setFilter } from "@/app/store/slices/productSlice";
import Slider from "@mui/material/Slider";

export default function ProductFilter() {
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.products);

    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);

    const prevFiltersRef = useRef(filters);

    // ---------- API Calls ----------
    const fetchCategoryAPI = async () => {
        const res = await fetch("/api/admin/category");
        const data = await res.json();
        setCategoryList(data);
    };

    const fetchBrandAPI = async () => {
        const res = await fetch("/api/admin/brand");
        const data = await res.json();
        setBrandList(data);
    };

    useEffect(() => {
        fetchCategoryAPI();
        fetchBrandAPI();
    }, []);

    // ---------- Filter Update ----------
    const handleFilterChange = (key, value) => {
        dispatch(setFilter({ key, value }));
    };

    // ---------- Category Multi-Select ----------
    const handleCategorySelect = (id, checked) => {
        if (checked) {
            handleFilterChange("category", [...filters.category, id]);
        } else {
            handleFilterChange(
                "category",
                filters.category.filter((item) => item !== id)
            );
        }
    };

    // ---------- Brand Multi-Select ----------
    const handleBrandSelect = (id, checked) => {
        if (checked) {
            handleFilterChange("brand", [...filters.brand, id]);
        } else {
            handleFilterChange(
                "brand",
                filters.brand.filter((item) => item !== id)
            );
        }
    };

    // ---------- Debounced Fetch ----------
    const debouncedFetch = useCallback(
        debounce(() => {
            dispatch(fetchProducts());
        }, 700),
        []
    );

    useEffect(() => {
        const prev = prevFiltersRef.current;

        const isChanged =
            prev.category !== filters.category ||
            prev.brand !== filters.brand ||
            prev.minprice !== filters.minprice ||
            prev.maxprice !== filters.maxprice;

        if (isChanged) {
            debouncedFetch();
            prevFiltersRef.current = filters;
        }
    }, [filters]);

    return (
        <div className="p-5 border border-gray-200 rounded-xl w-64 bg-white shadow-sm">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Filters</h3>

            {/* CATEGORY */}
            <h4 className="font-semibold text-gray-700 mb-2 text-sm tracking-wide">Category</h4>
            <div className="space-y-1 mb-4">
                {categoryList.map((cat) => (
                    <div key={cat._id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="cursor-pointer accent-blue-600"
                            checked={filters.category.includes(cat._id)}
                            onChange={(e) =>
                                handleCategorySelect(cat._id, e.target.checked)
                            }
                        />
                        <span className="text-gray-700 text-sm">{cat.name}</span>
                    </div>
                ))}
            </div>

            <hr className="my-4 border-gray-300" />

            {/* BRAND */}
            <h4 className="font-semibold text-gray-700 mb-2 text-sm tracking-wide">Brand</h4>
            <div className="space-y-1 mb-4">
                {brandList.map((brand) => (
                    <div key={brand._id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="cursor-pointer accent-blue-600"
                            checked={filters.brand.includes(brand._id)}
                            onChange={(e) =>
                                handleBrandSelect(brand._id, e.target.checked)
                            }
                        />
                        <span className="text-gray-700 text-sm">{brand.name}</span>
                    </div>
                ))}
            </div>

            <hr className="my-4 border-gray-300" />

            {/* PRICE */}
            <h4 className="font-semibold text-gray-700 mb-2 text-sm tracking-wide">
                Price Range
            </h4>

            <div className="px-1 py-2">
                <Slider
                    value={[
                        Number(filters.minprice) || 0,
                        Number(filters.maxprice) || 50000,
                    ]}
                    onChange={(e, newValue) => {
                        handleFilterChange("minprice", newValue[0]);
                        handleFilterChange("maxprice", newValue[1]);
                    }}
                    valueLabelDisplay="auto"
                    color="info"
                    min={0}
                    max={50000}
                    sx={{
                        "& .MuiSlider-thumb": { width: 18, height: 18 },
                        "& .MuiSlider-track": { height: 4 },
                        "& .MuiSlider-rail": { height: 4 },
                    }}
                />
            </div>
        </div>
    );
}
