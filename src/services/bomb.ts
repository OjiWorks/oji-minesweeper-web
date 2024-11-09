import { createSlice } from "@reduxjs/toolkit";

import initialState from "../store/initialState";
import * as recursion from "../utils/recursion";
import { CELL_STATE } from "../CONSTANTS";

export const bombSlice = createSlice({
  name: "bomb",
  initialState,
  reducers: {
    setGameInfo: (state, action) => {
      state.gameSetting = action.payload;
    },
    setTimerReset: (state) => {
      state.timer.timeCount = 0;
    },
    setTimer: (state) => {
      state.timer.timeCount++;
    },
    setIsGameEnd: (state, action) => {
      state.isGameEnd = action.payload;
    },
    toggleView: (state) => {
      state.viewMode = state.viewMode === "entrance" ? "gameBoard" : "entrance";
    },
    setField: (state, action) => {
      state.field = action.payload;
    },
    setButtonState: (state, action) => {
      const { row, column, index } = action.payload;
      const buttonState = [CELL_STATE.COVERED, CELL_STATE.FLAG, CELL_STATE.QUESTION];

      state.field.coverField[column][row] = buttonState[index];
    },
    openButtons: (state, { payload: [column, row] }) => {
      recursion.openButtonRecursive(state, column, row);
    },
    openAroundButtons: (state, { payload: [column, row] }) => {
      recursion.openAroundButtonRecursive(state, column, row);
    },
  },
});

export const { setGameInfo, setTimerReset, setTimer, setIsGameEnd, toggleView, setField, setButtonState, openButtons, openAroundButtons } = bombSlice.actions;

export default bombSlice.reducer;
