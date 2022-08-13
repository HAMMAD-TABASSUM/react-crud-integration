import { ProductsSlice } from "../Slice/products-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  products: ProductsSlice.reducer,
});
