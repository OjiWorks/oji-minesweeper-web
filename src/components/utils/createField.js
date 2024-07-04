export default function createUnderField(row = 9, column = 9, bombRate = 0.12) {
  const bombCount = Math.floor(row * column * bombRate);
  const tempArray = [...Array(bombCount).fill(9), ...Array(row * column - bombCount).fill(0)];
  const field = [];

  tempArray.sort(() => Math.random() - 0.5);

  while (tempArray.length > 0) {
    field.push(tempArray.splice(0, row));
  }

  for (const col in field) {
    for (const row in field[col]) {
      if (field[col][row] === 0) {
        field[col][row] = countBomb(field, [+col, +row]);
      }
    }
  }

  return field;
}

function countBomb(field, [col, row]) {
  const aroundArray = [
    [col - 1, row - 1], [col - 1, row], [col - 1, row + 1],
    [col, row - 1], [col, row + 1],
    [col + 1, row - 1], [col + 1, row], [col + 1, row + 1]
  ];

  return aroundArray.filter(([col, row]) => field[col]?.[row] === 9).length;
}
