import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import productReducer from "../src/features/products/productSlice";
import cartReducer from "../src/features/cart/cartSlice";
import orderReducer from "../src/features/order/orderSlice";

const authReducer = (state = { token: null }) => state;

const createTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: authReducer,
      products: productReducer,
      cart: cartReducer,
      order: orderReducer,
    },
    preloadedState,
  });

const renderWithProviders = (
  ui,
  { preloadedState, store = createTestStore(preloadedState), route = "/" } = {},
) => {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  };
};

export { createTestStore, renderWithProviders };
