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
    },
    setButtonState: (state, action) => {
      const buttonState = ["covered", "flag", "question"];
      const { row, column, index } = action.payload;

      state.field.coverField[column][row] = buttonState[index];
    }
  },
});

export const { setGameInfo, toggleView, setField, setButtonState } = bombSlice.actions;

export default bombSlice.reducer;