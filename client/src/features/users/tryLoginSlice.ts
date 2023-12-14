import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginData } from '../../models/LoginModel';

interface GetLoginPayload {
  id: string | null;
  pw: string | null;
}

interface LoginState {
  data: LoginData | null;
  loading: boolean;
  error: string | null;
}

interface UpdateUserData {
  photo?: File;
}

const initialState = {
  data: null,
  loading: false,
  error: null,
} as LoginState;

export const updateUser = createAsyncThunk('users/updateUser', async (userData: FormData, thunkApi) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/updateMe`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const tryLogin = createAsyncThunk('users/tryLogin', async ({ id, pw }: GetLoginPayload, thunkApi) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        email: id,
        password: pw,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const tryLoginSlice = createSlice({
  name: 'tryLogin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(tryLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(tryLogin.fulfilled, (state, action: PayloadAction<LoginData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(tryLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<LoginData>) => {
        state.data = { ...state.data, ...action.payload };
      });
  },
});

export default tryLoginSlice.reducer;
