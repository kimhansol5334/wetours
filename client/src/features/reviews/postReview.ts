import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Reviews } from '../../models/ReviewModel';

interface GetPostReviewPayload {
  tour: string | null;
  user: string | undefined;
  rating: number | null;
  review: string | null;
}
interface PostReviewState {
  data: Reviews | null;
  loading: boolean;
  error: string | null;
}

const initialState = {
  data: null,
  loading: false,
  error: null,
} as PostReviewState;

export const postReview = createAsyncThunk(
  'reviews/postReview',
  async ({ tour, user, rating, review }: GetPostReviewPayload, thunkApi) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tours/${tour}/reviews`,
        {
          tour: tour,
          user: user,
          rating: rating,
          review: review,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const postReviewSlice = createSlice({
  name: 'postReview',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postReview.fulfilled, (state, action: PayloadAction<Reviews>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postReview.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postReviewSlice.reducer;
