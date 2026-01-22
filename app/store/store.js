import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/withlist";
import categoryBrand from "./slices/categoryBrandSlice"
export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        wishList: wishListReducer,
        categoryBrand: categoryBrand,
    },
});