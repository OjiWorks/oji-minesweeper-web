export default function getAround(col, row) {
  return [[col - 1, row - 1], [col - 1, row], [col - 1, row + 1],
  [col, row - 1], [col, row + 1],
  [col + 1, row - 1], [col + 1, row], [col + 1, row + 1]];
}