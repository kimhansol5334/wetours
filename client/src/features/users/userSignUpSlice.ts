import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginData } from '../../models/LoginModel';

interface GetSignUpPayload {
  id: string | null;
  pw: string | null;
  confirmPw: string | null;
  name: string | null;
}

interface SignUpState {
  data: LoginData | null;
  loading: boolean;
  error: string | null;
}

const initialState = {
  data: null,
  loading: false,
  error: null,
} as SignUpState;

export const getSignUp = createAsyncThunk(
  'users/getSignUp',
  async ({ id, pw, confirmPw, name }: GetSignUpPayload, thunkApi) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
        email: id,
        password: pw,
        passwordConfirm: confirmPw,
        name: name,
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const userSignUpSlice = createSlice({
  name: 'getSignUp',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSignUp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSignUp.fulfilled, (state, action: PayloadAction<LoginData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSignUp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSignUpSlice.reducer;
