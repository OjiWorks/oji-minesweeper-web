import { configureStore } from "@reduxjs/toolkit";
import initialState from "./initialState";

import bombReducer from "../services/bomb";

const reducer = {
  bomb: bombReducer,
};

const store = configureStore({
  reducer,
  initialState,
});

export default store;