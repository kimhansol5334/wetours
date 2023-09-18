import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counters/counterSlice';
import tourUnitSlice from './features/tours/tourUnitSlice';
import tourSlice from './features/tours/tourSlice';

// redux '스토어' 를 생성 한다.   * (하단 링크 공식문서를 참조) *

// 이후에 다른 Slice 추가시 reducer 밑에 추가
// ex) reducer: { posts: postSlice ,
//                items: itemSlice},

const store = configureStore({
  reducer: {
    counter: counterSlice,
    tours: tourSlice,
    tour: tourUnitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
