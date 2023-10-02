import { configureStore } from '@reduxjs/toolkit';
import tourUnitSlice from './features/tours/tourUnitSlice';
import tourSlice from './features/tours/tourSlice';
import userUnitSlice from './features/users/userUnitSlice';
import reviewSlice from './features/reviews/reviewOnTour';

const store = configureStore({
  reducer: {
    tours: tourSlice,
    tour: tourUnitSlice,
    user: userUnitSlice,
    reviews: reviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
