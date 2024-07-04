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
  },
});

export const { setGameInfo, toggleView, setField, setButtonState, openButton } = bombSlice.actions;

export default bombSlice.reducer;
