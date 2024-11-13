import getAround from "./getAround";
import { UnderState } from "../types";

export default function createUnderField(rowCount = 9, columnCount = 9, bombRate = 0.05) {
  const field = [];

  const bombCount = Math.floor(rowCount * columnCount * bombRate);
  const bombs: Extract<UnderState, "bomb">[] = Array(bombCount).fill("bomb");
  const nonBombs: Extract<UnderState, "nonBomb">[] = Array(rowCount * columnCount - bombCount).fill("nonBomb");
  const totalBombState: UnderState[] = [...bombs, ...nonBombs];

  totalBombState.sort(() => Math.random() - 0.5);

  while (totalBombState.length > 0) {
    const row = totalBombState.splice(0, rowCount);
    field.push(row);
  }

  for (const column in field) {
    for (const row in field[column]) {
      if (field[column][row] === "nonBomb") {
        field[column][row] = countSurroundingBombs(field, [+column, +row]);
      }
    }
  }

  return field;
}

function countSurroundingBombs(field: UnderState[][], [col, row]: number[]) {
  const surroundingCells = getAround(col, row);
  const surroundingBombs = surroundingCells.filter(([col, row]) => field[col]?.[row] === "bomb");

  return surroundingBombs.length;
}
