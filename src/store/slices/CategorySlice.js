import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Api";

export const fetchCategories = createAsyncThunk(
  "category/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories/getAllCategory");

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);
const initialState = {
  loading: false,
  error: null,
  categoryList: [],
  categoryData:"",
  singlecate:{}
};
const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
    .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categoryList = payload;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
    })
export default CategorySlice.reducer;
