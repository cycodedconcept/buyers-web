import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import disputeReducer from "../features/disputes/disputeSlice";
import blogReducer from "../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    disputes: disputeReducer,
    blog: blogReducer,
  },
});
