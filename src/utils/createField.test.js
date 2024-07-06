import { it, describe, expect } from "vitest";

import createUnderField from "./createField";

describe("지뢰찾기 필드 생성", function () {
  it("기본적으로 9 x 9 필드를 생성해야 한다.", function () {
    const expectedRow = 9;
    const expectedColumns = 9;

    const output = createUnderField();

    expect(output.length).to.equal(expectedColumns);
    expect(output.every((column) => column.length === expectedRow)).to.equal(true);
  });

  it("사용자 정의에 따라 row x column 필드를 생성해야 한다.", function () {
    const fixtures = [
      { row: 10, column: 10 },
      { row: 20, column: 30 },
      { row: 40, column: 20 },
    ]

    for (const { row, column } of fixtures) {
      expect(createUnderField(row, column).length).to.equal(column);
      expect(createUnderField(row, column).every((column) => column.length === row)).to.equal(true);
    }
  });

  it("bombRate에 따라 적절한 폭탄이 설치되어야 한다.", function () {
    const fixtures = [
      { row: 100, column: 100, bombRate: 0.12 },
      { row: 100, column: 100, bombRate: 0.15 },
      { row: 100, column: 100, bombRate: 1 },
    ];

    for (const { row, column, bombRate } of fixtures) {
      let bomb = 0;

      createUnderField(row, column, bombRate).forEach((arr) => {
        arr.forEach((element) => {
          if (element === 9) {
            bomb++;
          }
        });
      });

      expect(bomb).to.equal(Math.floor(row * column * bombRate));
    }
  });
});
