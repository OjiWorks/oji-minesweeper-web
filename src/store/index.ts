import { configureStore, combineReducers } from "@reduxjs/toolkit";
import initialBombState from "./initialState";
import bombReducer from "./bombSlice";

const reducer = combineReducers({
  bomb: bombReducer,
});

const store = configureStore({
  reducer,
  preloadedState: {
    bomb: initialBombState,
  },
});

export default store;
//TODO: 이하코드 위치 type 파일로 가야하는지 확인
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
