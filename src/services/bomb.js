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
    setTimer: (state) => {
      state.timer.timeCount++;
    },
    setIsGameEnd: (state) => {
      state.isGameEnd = true;
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
      const stack = [[column, row]];

      while (stack.length > 0) {
        const [col, row] = stack.pop();

        if (!field.coverField[col]?.[row]
          || field.coverField[col][row] === CELL_STATE.OPEN
          || field.underField[col][row] === UNDER_STATE.BOMB) continue;

        field.coverField[col][row] = CELL_STATE.OPEN;

        const aroundArray = getAround(col, row);

        if (field.underField[col][row] === UNDER_STATE.NONE) {
          aroundArray.forEach((neighbor) => {
            const [nCol, nRow] = neighbor;

            if (field.coverField[nCol]?.[nRow] !== CELL_STATE.OPEN
              && field.underField[nCol]?.[nRow] !== UNDER_STATE.BOMB) {
              stack.push(neighbor);
            }
          });
        }
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

export const { setGameInfo, setTimer, setIsGameEnd, toggleView, setField, setButtonState, openButtons, openAroundButtons } = bombSlice.actions;

export default bombSlice.reducer;
