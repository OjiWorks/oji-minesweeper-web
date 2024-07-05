import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

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
    isGameEnd: (state) => {
      state.gameOver = true;
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
    openButtons: (state, { payload: [column, row] }) => {
      const field = state.field;
      const stack = [[column, row]];

      while (stack.length > 0) {
        const [col, row] = stack.pop();

        // 현재 위치가 열려 있거나 유효하지 않거나 지뢰인 경우 계속 진행
        if (!field.coverField[col]?.[row]
          || field.coverField[col][row] === "open"
          || field.underField[col][row] === 9) continue;

        field.coverField[col][row] = "open";

        const aroundArray = [
          [col - 1, row - 1], [col - 1, row], [col - 1, row + 1],
          [col, row - 1], [col, row + 1],
          [col + 1, row - 1], [col + 1, row], [col + 1, row + 1]
        ];

        if (field.underField[col][row] === 0) {
          aroundArray.forEach((neighbor) => {
            const [nCol, nRow] = neighbor;

            if (field.coverField[nCol]?.[nRow] !== "open" && field.underField[nCol]?.[nRow] !== 9) {
              stack.push(neighbor);
            }
          });
        }
      }
    },
    openAroundButtons: (state, { payload: [column, row] }) => {
      const aroundArray = [
        [column - 1, row - 1], [column - 1, row], [column - 1, row + 1],
        [column, row - 1], [column, row], [column, row + 1],
        [column + 1, row - 1], [column + 1, row], [column + 1, row + 1]
      ];
      const aroundFlagCount = aroundArray.reduce((flagCount, [column1, row1]) => {
        if (state.field.coverField[column1]?.[row1] === "flag") {
          return flagCount + 1;
        }

        return flagCount;
      }, 0)

      if(!state.field.coverField[column]?.[row] || state.field.coverField[column][row] !== "open" || state.field.underField[column][row] !== aroundFlagCount) return;

      aroundArray.forEach(([column, row]) => {
        if (state.field.coverField[column]?.[row] !== "flag" || state.field.coverField[column]?.[row] === "") {
          bombSlice.caseReducers.openButtons(state, { payload: [column, row] });
        }
      });
    },
  },
});

export const { setGameInfo, setTimer, isGameEnd, toggleView, setField, setButtonState, openButtons, openAroundButtons } = bombSlice.actions;

export default bombSlice.reducer;
