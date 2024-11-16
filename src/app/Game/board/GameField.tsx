"use client";

import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "@/src/hooks/useRedux";

import Results from "./Results";
import CongratsCard from "@components/CongratsCard";
import CongratsMessage from "@components/CongratsMessage";
import { setIsGameEnd, setIsUserWin, openAroundCells, openCells, setCellState } from "@/src/store/bombSlice";

import mrBomb_mascot from "@/public/images/mrBomb.png";
import { GRID_COLS, GRID_ROWS } from "@/src/CONSTANTS";
import { useMemo } from "react";

export default function GameField() {
  const dispatch = useAppDispatch();
  const { gameConfig, field, isGameEnd, isUserWin } = useAppSelector((state) => state.bomb);
  const { row, column, difficulty } = gameConfig;

  const bombCount = Math.floor(row * column * difficulty);
  const openCount = useMemo(() => {
    let count = 0;

    field.coverField?.forEach((columns) =>
      columns?.forEach((row) => {
        if (row === "open") count++;
      })
    );
    return count;
  }, [field.coverField]);

  const isWin = useMemo(() => bombCount === row * column - openCount, [row, column, openCount, bombCount]);

  function handleLeftClick(column: number, row: number) {
    if (field.underField[column][row] === "bomb") {
      dispatch(setIsGameEnd(true));
      return;
    }

    if (field.coverField[column][row] !== "open") {
      dispatch(openCells([column, row]));
    }
  }

  function handleBothClick(e: React.MouseEvent, column: number, row: number) {
    const clickType = e.buttons;
    const BOTH_CLICK = 3;

    if (clickType === BOTH_CLICK) {
      e.preventDefault();
      dispatch(openAroundCells([column, row]));
    }
  }

  if (isWin) setIsUserWin(true);
  if (isUserWin) dispatch(setIsGameEnd(true));

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
                    onContextMenu={() => {
                      dispatch(setCellState([row, column, "flag"]));
                    }}
                    className="custom-closeButton"
                  ></button>
                );

              case "flag":
                return (
                  <button
                    data-test="flag-button"
                    key={row + "-" + column}
                    onContextMenu={() => {
                      dispatch(setCellState([row, column, "question"]));
                    }}
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
                    onContextMenu={() => dispatch(setCellState([row, column, "covered"]))}
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
                    {field.underField[column][row] !== "bomb" ? field.underField[column][row] : ""}
                  </div>
                );
            }
          });
        })}
      </main>
      {!isUserWin && isGameEnd && createPortal(<Results />, document.body)}
      <img
        src={mrBomb_mascot.src}
        width="200px"
        className="absolute -top-[130px] md:top-auto md:bottom-0 -right-20 md:-right-[200px] z-15"
      />
      {isUserWin && createPortal(<CongratsCard />, document.body)}
      {isUserWin ? <CongratsMessage /> : null}
    </div>
  );
}
