import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

export const bombSlice = createSlice({
  name: "bomb",
  initialState: initialState,
  reducers: {
    addEvent: (state, action) => {
    },
    removeEvent: (state, action) => {
    }
  },
});

export const { addEvent, removeEvent } = bombSlice.actions;

export default bombSlice.reducer;