import { UNDER_STATE } from "../CONSTANTS";
import getAround from "./getAround";

export default function createUnderField(row = 9, column = 9, bombRate = 0.05) {
  const bombCount = Math.floor(row * column * bombRate);
  const tempArray = [...Array(bombCount).fill(UNDER_STATE.BOMB), ...Array(row * column - bombCount).fill(UNDER_STATE.NONE)];
  const field = [];

  tempArray.sort(() => Math.random() - 0.5);

  while (tempArray.length > 0) {
    const singleRow = tempArray.splice(0, row);

    field.push(singleRow);
  }

  for (const col in field) {
    for (const row in field[col]) {
      if (field[col][row] === UNDER_STATE.NONE) {
        field[col][row] = countBomb(field, [+col, +row]);
      }
    }
  }

  return field;
}

function countBomb(field, [col, row]) {
  const aroundArray = getAround(col, row);

  return aroundArray.filter(([col, row]) => field[col]?.[row] === UNDER_STATE.BOMB).length;
}
