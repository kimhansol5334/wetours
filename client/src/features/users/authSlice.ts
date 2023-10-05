import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  pw: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPw: (state, action) => {
      state.pw = action.payload;
    },
    resetAuth: (state) => {
      state.id = '';
      state.pw = '';
    },
  },
});

export const { setId, setPw, resetAuth } = authSlice.actions;

export default authSlice.reducer;
