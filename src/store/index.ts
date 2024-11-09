import { configureStore } from "@reduxjs/toolkit";
import initialState from "./initialState";
import bombReducer from "../services/bomb";

const reducer = {
  bomb: bombReducer,
};

const store = configureStore({
  reducer: reducer.bomb,
  preloadedState: initialState,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
