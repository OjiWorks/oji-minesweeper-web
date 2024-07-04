import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

export const bombSlice = createSlice({
  name: "bomb",
  initialState,
  reducers: {
    setGameInfo: (state, action) => {
      state.gameSetting = action.payload;
    },
    toggleView: (state) => {
      state.viewMode = state.viewMode === "entrance" ? "gameBoard" : "entrance";
    },
    setField: (state, action) => {
      state.field = action.payload;
    }
  },
});

export const { setGameInfo, toggleView, setField } = bombSlice.actions;

export default bombSlice.reducer;