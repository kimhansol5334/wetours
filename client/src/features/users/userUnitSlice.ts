import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../models/ReviewModel';

export const getUserById = createAsyncThunk('users/getUserById', async (id: string, thunkApi) => {
  try {
    const response = await axios.get<User>(`${process.env.REACT_APP_API_URL}/tours/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface UserState {
  loading: boolean;
  error: null | string;
  data: null | User;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
} as UserState;

const userUnitSlice = createSlice({
  name: 'userunit',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userUnitSlice.reducer;
