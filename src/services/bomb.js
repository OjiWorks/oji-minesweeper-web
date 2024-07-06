import { createSlice } from "@reduxjs/toolkit";

import initialState from "../store/initialState";
import getAround from "../utils/getAround";
import { CELL_STATE, UNDER_STATE } from "../CONSTANTS";

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
      const field = state.field;

      if (!field.coverField[column]?.[row]
        || field.coverField[column][row] === CELL_STATE.OPEN
        || field.underField[column][row] === UNDER_STATE.BOMB) return;

      field.coverField[column][row] = CELL_STATE.OPEN;

      const aroundArray = getAround(column, row);

      if (field.underField[column][row] === UNDER_STATE.NONE) {
        aroundArray.forEach((neighbor) => {
          const [nCol, nRow] = neighbor;

          if (field.coverField[nCol]?.[nRow] !== CELL_STATE.OPEN
            && field.underField[nCol]?.[nRow] !== UNDER_STATE.BOMB) {
              bombSlice.caseReducers.openButtons(state, { payload: neighbor });
          }
        });
      }
    },
    openAroundButtons: (state, { payload: [column, row] }) => {
      const aroundArray = getAround(column, row);

      const aroundFlagCount = aroundArray.reduce((flagCount, [column1, row1]) => {
        if (state.field.coverField[column1]?.[row1] === CELL_STATE.FLAG) {
          return flagCount + 1;
        }

        return flagCount;
      }, 0)

      if (!state.field.coverField[column]?.[row]
        || state.field.coverField[column][row] !== CELL_STATE.OPEN
        || state.field.underField[column][row] !== aroundFlagCount) return;

      aroundArray.forEach(([column, row]) => {
        if (state.field.coverField[column]?.[row] !== CELL_STATE.FLAG
          && state.field.underField[column]?.[row] === UNDER_STATE.BOMB) {
          state.field.coverField[column][row] = CELL_STATE.OPEN;
          state.isGameEnd = true;
        }

        if (state.field.coverField[column]?.[row] !== CELL_STATE.FLAG
          || state.field.coverField[column]?.[row] === UNDER_STATE.NONE) {
          bombSlice.caseReducers.openButtons(state, { payload: [column, row] });
        }
      });
    },
  },
});

export const { setGameInfo, setTimerReset, setTimer, setIsGameEnd, toggleView, setField, setButtonState, openButtons, openAroundButtons } = bombSlice.actions;

export default bombSlice.reducer;
