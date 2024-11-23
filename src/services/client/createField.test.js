import createUnderField from "./createField";

describe("지뢰찾기 필드 생성", function () {
  test("기본적으로 9 x 9 필드를 생성해야 한다.", function () {
    const expectedRow = 9;
    const expectedColumns = 9;

    const output = createUnderField();

    expect(output.length).toBe(expectedColumns);
    expect(output.every((column) => column.length === expectedRow)).toBe(true);
  });

  test("사용자 정의에 따라 row x column 필드를 생성해야 한다.", function () {
    const fixtures = [
      { row: 10, column: 10 },
      { row: 20, column: 30 },
      { row: 40, column: 20 },
    ];

    for (const { row, column } of fixtures) {
      expect(createUnderField(row, column).length).toBe(column);
      expect(
        createUnderField(row, column).every((column) => column.length === row)
      ).toBe(true);
    }
  });

  test("bombRate에 따라 적절한 폭탄이 설치되어야 한다.", function () {
    const fixtures = [
      { row: 100, column: 100, bombRate: 0.12 },
      { row: 100, column: 100, bombRate: 0.15 },
      { row: 100, column: 100, bombRate: 1 },
    ];

    for (const { row, column, bombRate } of fixtures) {
      let bomb = 0;

      createUnderField(row, column, bombRate).forEach((arr) => {
        arr.forEach((element) => {
          if (element === "bomb") {
            bomb++;
          }
        });
      });

      expect(bomb).toBe(Math.floor(row * column * bombRate));
    }
  });

  test("시드가 존재할 경우 같은 시드는 같은 필드를 반환해야 한다.", function () {
    const fixture = [
      { row: 30, column: 30, bombRate: 0.12, isoDate: "20240101" },
      { row: 50, column: 50, bombRate: 0.12, isoDate: "20400101" },
      { row: 100, column: 100, bombRate: 0.15, isoDate: "20241231" },
    ];

    for (const { row, column, bombRate, isoDate } of fixture) {
      expect(createUnderField(row, column, bombRate, isoDate)).toStrictEqual(
        createUnderField(row, column, bombRate, isoDate)
      );
    }
  });
});
