import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Reviews } from '../../models/ReviewModel';

interface GetFiltersPayload {
  page: number | null;
  id: number | null;
}

export const getAllReviewsOnTour = createAsyncThunk(
  'reviews/getAllReviewsOnTour',
  async ({ id, page }: GetFiltersPayload, thunkApi) => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/tours/${id}/reviews?limit=5`;

      if (page) {
        url += `&page=${page}`;
      }

      const response = await axios.get<Reviews>(url);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

interface ReviewState {
  page: number;
  loading: boolean;
  error: null | string;
  data: null | Reviews;
}

const initialState = {
  page: 1,
  loading: false,
  error: null,
  data: null,
} as ReviewState;

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllReviewsOnTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllReviewsOnTour.fulfilled, (state, action: PayloadAction<Reviews>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllReviewsOnTour.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = reviewSlice.actions;

export default reviewSlice.reducer;
