import getAround from "./getAround";
import { UnderState, BombCount } from "@/src/types";
import createSeed from "./createSeed";

export default function createUnderField(
  rowCount = 9,
  columnCount = 9,
  difficulty = 0.05,
  isoDate?: string
) {
  const field = [];
  const initialBombCount = 0;

  const bombCount = Math.floor(rowCount * columnCount * difficulty);
  const bombs: Extract<UnderState, "bomb">[] = Array(bombCount).fill("bomb");
  const nonBombs: Extract<UnderState, BombCount>[] = Array(
    rowCount * columnCount - bombCount
  ).fill(initialBombCount);
  const totalBombState: UnderState[] = [...bombs, ...nonBombs];

  if (isoDate) {
    totalBombState.sort(() => Math.random() - createSeed(isoDate));
  } else {
    totalBombState.sort(() => Math.random() - 0.5);
  }

  while (totalBombState.length > 0) {
    const row = totalBombState.splice(0, rowCount);
    field.push(row);
  }

  for (const column in field) {
    for (const row in field[column]) {
      if (field[column][row] === initialBombCount) {
        field[column][row] = countSurroundingBombs(field, [+column, +row]);
      }
    }
  }

  return field;
}

function countSurroundingBombs(field: UnderState[][], [col, row]: number[]) {
  const surroundingCells = getAround(col, row);
  const surroundingBombs = surroundingCells.filter(
    ([col, row]) => field[col]?.[row] === "bomb"
  );

  return surroundingBombs.length;
}
