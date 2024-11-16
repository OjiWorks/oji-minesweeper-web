"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@src/hooks/useRedux";

import Results from "./Results";
import CongratsCard from "@components/CongratsCard";
import CongratsMessage from "@components/CongratsMessage";
import { Button } from "@components/Button";

import createUnderField from "@src/services/client/createField";
import { setGameConfig, setField, setTimerReset } from "@src/store/bombSlice";
import { setIsGameEnd, openAroundCells, openCells, setCellState } from "@src/store/bombSlice";
import { CoverState } from "@src/types";

import mrBomb_mascot from "@src/public/images/mrBomb.png";
import { GRID_COLS, GRID_ROWS } from "@src/CONSTANTS";

export default function GameField() {
  const dispatch = useAppDispatch();
  const [isWin, setIsWin] = useState(false);
  const { isGameEnd, field, gameConfig } = useAppSelector((state) => state.bomb);
  const { row, column, bombRate } = gameConfig;

  let openCount = 0;
  const bombCount = Math.floor(row * column * bombRate);

  function handleLeftClick(column: number, row: number) {
    if (field.underField[column][row] === "bomb") {
      dispatch(setIsGameEnd(true));
    }

    dispatch(openCells([column, row]));
  }

  function handleBothClick(e: React.MouseEvent, column: number, row: number) {
    const clickType = e.buttons;
    const BOTH_CLICK = 3;

    if (clickType === BOTH_CLICK) {
      e.preventDefault();
      dispatch(openAroundCells([column, row]));
    }
  }

  useEffect(() => {
    field.coverField?.forEach((columns) =>
      columns?.forEach((row) => {
        if (row === "open") openCount++;
      })
    );

    if (bombCount === row * column - openCount) {
      setIsWin(true);
    }

    if (isWin) {
      dispatch(setIsGameEnd(true));
    }
  });

  function handleReplay() {
    const underField = createUnderField(row, column, bombRate);
    const coverField = Array(column).fill(Array(row).fill("covered")) as CoverState[][];

    dispatch(setGameConfig({ row, column, bombRate }));
    dispatch(setField({ underField, coverField }));
    dispatch(setIsGameEnd(false));
    dispatch(setTimerReset());
    setIsWin(false);
  }

  return (
    <div className="relative">
      <main
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className={`grid ${GRID_ROWS[row]} ${GRID_COLS[column]} relative border-4 border-amber-800 shadow-lg rounded bg-amber-100 min-w-max z-30`}
      >
        {field.coverField.map((columnArray, column) => {
          return columnArray.map((element, row) => {
            switch (element) {
              case "covered":
                return (
                  <button
                    data-test="covered-button"
                    key={row + "-" + column}
                    onClick={() => handleLeftClick(column, row)}
                    onContextMenu={() => dispatch(setCellState([row, column, "covered"]))}
                    className="custom-closeButton"
                  ></button>
                );

              case "flag":
                return (
                  <button
                    data-test="flag-button"
                    key={row + "-" + column}
                    onContextMenu={() => dispatch(setCellState([row, column, "flag"]))}
                    className="custom-closeButton"
                  >
                    🚩
                  </button>
                );

              case "question":
                return (
                  <button
                    data-test="question-button"
                    key={row + "-" + column}
                    onContextMenu={() => dispatch(setCellState([row, column, "question"]))}
                    className="custom-closeButton"
                  >
                    ?
                  </button>
                );

              case "open":
                return (
                  <div
                    key={row + "-" + column}
                    onMouseDown={(e) => handleBothClick(e, column, row)}
                    className="custom-openButton"
                  >
                    {field.underField[column][row] === "nonBomb" ? "" : field.underField[column][row]}
                  </div>
                );
            }
          });
        })}
      </main>
      {!isWin && isGameEnd && createPortal(<Results />, document.body)}
      <img
        src={mrBomb_mascot.src}
        width="200px"
        className="absolute -top-[130px] md:top-auto md:bottom-0 -right-20 md:-right-[200px] z-15"
      />
      {/* TODO: 관심사 분리하기. 현재 셀 컴포넌트에서 네비게이션 동작을 진행함 */}
      {isWin && createPortal(<CongratsCard />, document.body)}
      <div className="absolute transform md:-translate-y-1/2 translate-x-0 md:top-1/2 md:-left-[80px] left-0 md:mt-0 mt-2 flex flex-col">
        <Button text={"다시하기"} onClick={() => handleReplay()} />
        {/* FIXME: 메인으로 이동하기 라우터 연결하기 */}
        <Button text={"메인으로"} onClick={() => location.reload()} />
      </div>
      {isWin ? <CongratsMessage /> : null}
    </div>
  );
}
