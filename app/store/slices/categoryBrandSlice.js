import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Fetch Categories
export const fetchCategories = createAsyncThunk(
    "categoryBrand/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/admin/category");
            if (!res.ok) throw new Error("Failed to fetch categories");
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchBrands = createAsyncThunk(
    "categoryBrand/fetchBrands",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/admin/brand");
            if (!res.ok) throw new Error("Failed to fetch brands");
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const categoryBrandSlice = createSlice({
    name: "categoryBrand",
    initialState: {
        categories: [],
        brands: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            /* Categories */
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* Brands */
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categoryBrandSlice.reducer;
