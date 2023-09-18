import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Tour } from '../../models/tourModels';

export const getTourById = createAsyncThunk('tours/getTourById', async (id: string, thunkApi) => {
  try {
    const response = await axios.get<Tour>(`${process.env.REACT_APP_API_URL}/tours/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface TourState {
  loading: boolean;
  error: null | string;
  data: null | Tour;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
} as TourState;

const tourUnitSlice = createSlice({
  name: 'tourunit',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTourById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTourById.fulfilled, (state, action: PayloadAction<Tour>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTourById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tourUnitSlice.reducer;
