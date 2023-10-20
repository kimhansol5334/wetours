import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  pw: '',
  confirmPw: '',
  name: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignUpId: (state, action) => {
      state.id = action.payload;
    },
    setSignUpPw: (state, action) => {
      state.pw = action.payload;
    },
    setSignUpConfirmPw: (state, action) => {
      state.confirmPw = action.payload;
    },
    setSignUpName: (state, action) => {
      state.name = action.payload;
    },
    resetSignUpAuth: (state) => {
      state.id = '';
      state.pw = '';
    },
  },
});

export const { setSignUpId, setSignUpPw, setSignUpConfirmPw, setSignUpName, resetSignUpAuth } = authSlice.actions;

export default authSlice.reducer;
