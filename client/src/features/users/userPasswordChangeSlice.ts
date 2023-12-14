import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface GetChangePasswordPayload {
  pw: string | null;
  newPw: string | null;
  newPwConfirm: string | null;
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const userPasswordChange = createAsyncThunk(
  'users/userPasswordChange',
  async ({ pw, newPw, newPwConfirm }: GetChangePasswordPayload, thunkApi) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/updateMyPassword`,
        {
          passwordCurrent: pw,
          password: newPw,
          passwordConfirm: newPwConfirm,
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

const userPasswordChangeSlice = createSlice({
  name: 'userDelte',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userPasswordChange.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userPasswordChange.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userPasswordChange.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userPasswordChangeSlice.reducer;
