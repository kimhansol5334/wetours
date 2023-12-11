import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface GetDeletePayload {
  pw: string | null;
}
const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const userDelete = createAsyncThunk('users/userDelete', async ({ pw }: GetDeletePayload, thunkApi) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/deleteMe`, {
      data: {
        password: pw,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const userDeleteSlice = createSlice({
  name: 'userDelte',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userDelete.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userDelete.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userDelete.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDeleteSlice.reducer;
