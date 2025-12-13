import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { getState }) => {
        const { filters } = getState().products;

        // Build query string
        const query = new URLSearchParams(filters).toString();

        const res = await fetch(`/api/user/products?${query}`);
        const data = await res.json();
        return data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        filters: {
            category: [],
            brand: [],
            minPrice: "",
            maxPrice: "",
            search: ""
        },
        error: null
    },
    reducers: {
        setFilter: (state, action) => {
            const { key, value } = action.payload;
            state.filters[key] = value;
        },
        resetFilters(state) {
            state.filters = {
                category: [],
                brand: [],
                minPrice: "",
                maxPrice: "",
                search: ""
            };
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; // <-- store data in Redux
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { setFilter, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
