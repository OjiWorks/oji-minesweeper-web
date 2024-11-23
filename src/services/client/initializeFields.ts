import { CoverState } from "@/src/types";
import createUnderField from "./createField";

export default function initializeFields(
  row: number,
  column: number,
  difficulty: number,
  seed?: string
) {
  const underField = createUnderField(row, column, difficulty, seed);
  const coverField = Array(column).fill(
    Array(row).fill("covered")
  ) as CoverState[][];

  return { underField, coverField };
}
