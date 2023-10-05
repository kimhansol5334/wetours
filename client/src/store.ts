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

const rootReducer = combineReducers({
  tours: tourSlice,
  tour: tourUnitSlice,
  user: userUnitSlice,
  reviews: reviewSlice,
  login: loginSlice,
  trylogin: tryLoginSlice,
  auth: authSlice,
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
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store); // 이것은 여러분의 애플리케이션에 persist/REHYDRATE 액션을 전송합니다.

export default store;
