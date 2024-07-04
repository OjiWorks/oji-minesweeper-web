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
    },
    openButton: (state, { payload: [column, row] }) => {
      console.log("시작");
      const field = state.field;

      if (field.coverField[column][row] === "open"
      || !field.coverField[column]?.[row]
      || field.underField[column][row] === 9) return;

      const aroundArray = [
        [column - 1, row - 1], [column - 1, row], [column - 1, row + 1],
        [column, row - 1], [column, row], [column, row + 1],
        [column + 1, row - 1], [column + 1, row], [column + 1, row + 1]
      ];

      state.field.coverField[column][row] = "open";

      aroundArray.forEach((neighbor) => {
        console.log("재귀시작!");
        openButton(neighbor);
      });
    },
  },
});

export const { setGameInfo, toggleView, setField, setButtonState, openButton } = bombSlice.actions;

export default bombSlice.reducer;