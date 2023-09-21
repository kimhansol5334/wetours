import { configureStore } from '@reduxjs/toolkit';
import tourUnitSlice from './features/tours/tourUnitSlice';
import tourSlice from './features/tours/tourSlice';

const store = configureStore({
  reducer: {
    tours: tourSlice,
    tour: tourUnitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
