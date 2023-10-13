import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../../models/BookingModel';

interface GetBookingPayload {
  id: string;
}

export const bookingOnTour = createAsyncThunk('bookings/bookingOnTour', async ({ id }: GetBookingPayload, thunkApi) => {
  try {
    let url = `${process.env.REACT_APP_API_URL}/bookings/checkout-session/${id}`;

    const response = await axios.get<Booking>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface BookingState {
  loading: boolean;
  error: null | string;
  data: null | Booking;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
} as BookingState;

const bookingSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(bookingOnTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(bookingOnTour.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(bookingOnTour.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
