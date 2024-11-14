import getAround from "./getAround";
import { Field } from "@src/types";

export function openCellRecursive(field: Field, column: number, row: number) {
  if (
    !field.coverField[column]?.[row] ||
    field.coverField[column][row] === "open" ||
    field.underField[column][row] === "bomb"
  )
    return;

  field.coverField[column][row] = "open";

  const aroundArray = getAround(column, row);

  if (field.underField[column][row] === "nonBomb") {
    aroundArray.forEach((neighbor) => {
      const [nCol, nRow] = neighbor;

      if (
        field.coverField[nCol]?.[nRow] !== "open" &&
        field.underField[nCol]?.[nRow] !== "bomb"
      ) {
        openCellRecursive(field, nCol, nRow);
      }
    });
  }
}
