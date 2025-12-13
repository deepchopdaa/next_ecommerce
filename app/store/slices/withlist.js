import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    wishListItems: [],
    totalQuantity: 0
};

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            const product = action.payload;
            console.log("wishList payload", product)
            const existingItem = state.wishListItems.find(
                (item) => item._id === product._id
            );
            if (!existingItem) {
                state.wishListItems.push({ ...product, quantity: 1 });
                state.totalQuantity += 1;
            }
        },

        removeFromWishList: (state, action) => {
            const id = action.payload;
            const item = state.wishListItems.find((p) => p._id === id);
            if (item) {
                state.totalQuantity -= 1;
                state.wishListItems = state.wishListItems.filter((p) => p._id !== id);
            }
        },
    },
});
export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;