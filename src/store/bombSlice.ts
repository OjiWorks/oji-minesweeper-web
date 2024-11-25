import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import initialState from "./initialState";
import openCellRecursive from "@/src/services/client/openCellRecursive";
import { CoverState, GameMode } from "@/src/types";
import { Field, GameConfig } from "../types/store";

export const bombSlice = createSlice({
  name: "bomb",
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
    },
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
  setGameMode,
  setGameConfig,
  setTimerReset,
  setTimer,
  setIsGameEnd,
  setField,
  setCellState,
  openCells,
  openAroundCells,
  setUserId,
} = bombSlice.actions;

export default bombSlice.reducer;
