import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import initialState from "./initialState";
import openCellRecursive from "@/src/services/client/openCellRecursive";
import { CoverState } from "@/src/types";
import { Field, GameConfig } from "../types/store";

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
    setIsUserWin: (state, action: PayloadAction<boolean>) => {
      state.isUserWin = action.payload;
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
      const { coverField, underField } = state.field;
      openCellRecursive(coverField, underField, column, row);
    },
    openAroundCells: (state, action: PayloadAction<[number, number]>) => {
      const [column, row] = action.payload;
      const { coverField, underField } = state.field;
      openCellRecursive(coverField, underField, column, row);
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const {
  setGameConfig,
  setTimerReset,
  setTimer,
  setIsGameEnd,
  setIsUserWin,
  setField,
  setCellState,
  openCells,
  openAroundCells,
  setUserId,
} = bombSlice.actions;

export default bombSlice.reducer;
