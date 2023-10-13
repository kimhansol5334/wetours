import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Tours } from '../../models/tourModels';

export const getAllTours = createAsyncThunk('tours/getAllTours', async (data, thunkApi) => {
  try {
    const response = await axios.get<Tours>(`${process.env.REACT_APP_API_URL}/tours`);
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface TourState {
  loading: boolean;
  error: null | string;
  data: null | Tours;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
} as TourState;

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllTours.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllTours.fulfilled, (state, action: PayloadAction<Tours>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllTours.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tourSlice.reducer;
