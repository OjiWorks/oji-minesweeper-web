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
