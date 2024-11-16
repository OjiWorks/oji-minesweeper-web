import { CoverState, UnderState } from "@/src/types";
import getAround from "./getAround";

export default function openCellRecursive(
  coverField: CoverState[][],
  underField: UnderState[][],
  column: number,
  row: number
) {
  if (!coverField[column]?.[row] || coverField[column][row] === "open" || underField[column][row] === "bomb") return;

  coverField[column][row] = "open";

  const around = getAround(column, row);
  const noBombNearby = 0;

  if (underField[column][row] === noBombNearby) {
    around.forEach((neighbor) => {
      const [neighborCol, neighborRow] = neighbor;

      if (coverField[neighborCol]?.[neighborRow] !== "open" && underField[neighborCol]?.[neighborRow] !== "bomb") {
        openCellRecursive(coverField, underField, neighborCol, neighborRow);
      }
    });
  }
}
