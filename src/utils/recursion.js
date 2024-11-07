import getAround from "./getAround";
import { CELL_STATE, UNDER_STATE } from "../CONSTANTS";

export function openButtonRecursive(state, column, row) {
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
        openButtonRecursive(state, nCol, nRow);
      }
    });
  }
}

export function openAroundButtonRecursive(state, column, row) {
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
      openButtonRecursive(state, column, row);
    }
  });
}
