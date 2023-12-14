import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tourUnitSlice from './features/tours/tourUnitSlice';
import tourSlice from './features/tours/tourSlice';
import userUnitSlice from './features/users/userUnitSlice';
import reviewSlice from './features/reviews/reviewOnTour';
import loginSlice from './features/users/userLoginSlice';
import tryLoginSlice from './features/users/tryLoginSlice';
import authSlice from './features/users/authSlice';
import postReviewSlice from './features/reviews/postReview';
import bookingSlice from './features/bookings/bookingSlice';
import userSignUpSlice from './features/users/userSignUpSlice';
import signUpAuthSlice from './features/users/signUpAuthSlice';
import userDeleteSlice from './features/users/userDeleteSlice';
import userPasswordChangeSlice, { userPasswordChange } from './features/users/userPasswordChangeSlice';

const rootReducer = combineReducers({
  tours: tourSlice,
  tour: tourUnitSlice,
  user: userUnitSlice,
  reviews: reviewSlice,
  login: loginSlice,
  trylogin: tryLoginSlice,
  auth: authSlice,
  signupAuth: signUpAuthSlice,
  postReview: postReviewSlice,
  booking: bookingSlice,
  signup: userSignUpSlice,
  userDelete: userDeleteSlice,
  userPasswordChange: userPasswordChangeSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['trylogin'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
