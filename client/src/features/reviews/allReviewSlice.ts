import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Reviews } from '../../models/ReviewModel';

interface GetIdPayload {
  id: number | null;
}

export const getAllReviews = createAsyncThunk('reviews/getAllReviews', async ({ id }: GetIdPayload, thunkApi) => {
  try {
    let url = `${process.env.REACT_APP_API_URL}/tours/${id}/reviews`;

    const response = await axios.get<Reviews>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

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

const allReviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllReviews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action: PayloadAction<Reviews>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allReviewSlice.reducer;
