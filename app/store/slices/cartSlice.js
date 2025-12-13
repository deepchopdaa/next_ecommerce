import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            console.log(product, 'add cart payload')
            const existingItem = state.cartItems.find(
                (item) => item._id === product._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...product, quantity: 1 });
            }

            state.totalQuantity += 1;
            state.totalPrice += product.discountPrice;
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p._id === id);

            if (item) {
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.discountPrice * item.quantity;
                state.cartItems = state.cartItems.filter((p) => p._id !== id);
            }
        },

        increaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p._id === id);

            if (item) {
                item.quantity++;
                state.totalQuantity++;
                state.totalPrice += item.discountPrice;
            }
        },

        decreaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p._id === id);

            if (item.quantity > 1) {
                item.quantity--;
                state.totalQuantity--;
                state.totalPrice -= item.discountPrice;
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0; // reset totalAmount if you track it
        },
    }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
