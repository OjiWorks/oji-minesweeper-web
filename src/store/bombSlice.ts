import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import initialState from "./initialState";
import * as recursion from "@src/services/recursion";
import { CoverState, Field, GameConfig } from "@src/types";

export const bombSlice = createSlice({
  name: "bomb",
  initialState,
  reducers: {
    setGameConfig: (state, action: PayloadAction<GameConfig>) => {
      state.gameConfig = action.payload;
    },
    setTimerReset: (state) => {
      state.timer.timeCount = 0;
    },
    setTimer: (state) => {
      state.timer.timeCount++;
    },
    setIsGameEnd: (state, action: PayloadAction<boolean>) => {
      state.isGameEnd = action.payload;
    },
    setField: (state, action: PayloadAction<Field>) => {
      state.field = action.payload;
    },
    setCellState: (
      state,
      action: PayloadAction<[number, number, CoverState]>
    ) => {
      const [row, column, coverState] = action.payload;
      state.field.coverField[column][row] = coverState;
    },
    openCells: (state, action: PayloadAction<[number, number]>) => {
      const [column, row] = action.payload;
      recursion.openCellRecursive(state.field, column, row);
    },
    openAroundCells: (state, action: PayloadAction<[number, number]>) => {
      const [column, row] = action.payload;
      recursion.openCellRecursive(state.field, column, row);
    },
  },
});

export const {
  setGameConfig,
  setTimerReset,
  setTimer,
  setIsGameEnd,
  setField,
  setCellState,
  openCells,
  openAroundCells,
} = bombSlice.actions;

export default bombSlice.reducer;
