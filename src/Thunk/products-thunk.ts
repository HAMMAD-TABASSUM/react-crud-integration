import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api";

// list record thunk
export const ProductsListThunk = createAsyncThunk(
  "Product-thunk",
  async (data, thunkApi) => {
    try {
      const response = await API.Products.list();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

// delete record thunk
export const DeleteProductThunk = createAsyncThunk(
  "Delete-Product-thunk",
  async (id: string, thunkApi) => {
    try {
      const response = await API.Products.deleteById(id);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
