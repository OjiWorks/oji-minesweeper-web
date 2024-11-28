import { CoverState } from "@/src/types";
import createUnderField from "./createField";
import { GameConfig } from "@/src/types/store";

export default function initializeFields({
  row,
  column,
  difficulty,
}: GameConfig) {
  const underField = createUnderField(row, column, difficulty);
  const coverField = Array(column).fill(
    Array(row).fill("covered")
  ) as CoverState[][];

  return { underField, coverField };
}
