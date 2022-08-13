import { createSlice } from "@reduxjs/toolkit";
import { ProductsListThunk } from "../Thunk";
import { ProductInterface } from "../Shared/Interfaces";

interface ProductState {
  data: ProductInterface[];
  loading: boolean;
  error: any;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};
export const ProductsSlice = createSlice({
  name: "items-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Products List
    builder
      .addCase(ProductsListThunk.pending, (state) => {
        state.loading = !state.data.length;
        state.error = null;
      })
      .addCase(ProductsListThunk.fulfilled, (state, { payload }) => {
        state.data = payload ?? [];
        state.loading = false;
        state.error = null;
      })
      .addCase(ProductsListThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error;
        }
        state.loading = false;
      });
  },
});
