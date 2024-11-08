import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { Results } from "../Results";
import CongratsCard from "../../components/CongratsCard";
import CongratsMessage from "../../components/CongratsMessage";
import { Button } from "../../components/Button";

import createUnderField from "../../utils/createField";
import { setGameInfo, setField, setTimerReset } from "../../services/bomb";
import {
  setIsGameEnd,
  openAroundButtons,
  openButtons,
  setButtonState,
} from "../../services/bomb";

import mrBomb_mascot from "../../assets/mrBomb.png";
import { CELL_STATE, GRID_COLS, GRID_ROWS, UNDER_STATE } from "../../CONSTANTS";

export default function GameField() {
  const [isWin, setIsWin] = useState(false);
  const isGameEnd = useSelector((state) => state.bomb.isGameEnd);
  const field = useSelector((state) => state.bomb.field);
  const { userId, row, column, bombRate } = useSelector(
    (state) => state.bomb.gameSetting
  );
  const bombCount = Math.floor(row * column * bombRate);
  const dispatch = useDispatch();
  let openCount = 0;

  function changeButtonContents(row, column, index) {
    dispatch(setButtonState({ row, column, index }));
  }

  function handleLeftClick(column, row) {
    if (field.underField[column][row] === UNDER_STATE.BOMB) {
      dispatch(setIsGameEnd(true));
    }

    dispatch(openButtons([column, row]));
  }

  function handleBothClick(e, column, row) {
    const clickType = e.buttons;
    const BOTH_CLICK = 3;

    if (clickType === BOTH_CLICK) {
      e.preventDefault();
      dispatch(openAroundButtons([column, row]));
    }
  }

  useEffect(() => {
    field.coverField?.forEach((columns) =>
      columns?.forEach((row) => {
        if (row === CELL_STATE.OPEN) openCount++;
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
    const coverField = Array(column).fill(Array(row).fill(CELL_STATE.COVERED));

    dispatch(setGameInfo({ userId, row, column, bombRate }));
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
              case CELL_STATE.COVERED:
                return (
                  <button
                    data-test="covered-button"
                    key={row + "-" + column}
                    onClick={() => handleLeftClick(column, row)}
                    onContextMenu={() => changeButtonContents(row, column, 1)}
                    className="custom-closeButton"
                  ></button>
                );

              case CELL_STATE.FLAG:
                return (
                  <button
                    data-test="flag-button"
                    key={row + "-" + column}
                    onContextMenu={() => changeButtonContents(row, column, 2)}
                    className="custom-closeButton"
                  >
                    🚩
                  </button>
                );

              case CELL_STATE.QUESTION:
                return (
                  <button
                    data-test="question-button"
                    key={row + "-" + column}
                    onContextMenu={() => changeButtonContents(row, column, 0)}
                    className="custom-closeButton"
                  >
                    ?
                  </button>
                );

              case CELL_STATE.OPEN:
                return (
                  <div
                    key={row + "-" + column}
                    onMouseDown={(e) => handleBothClick(e, column, row)}
                    className="custom-openButton"
                  >
                    {field.underField[column][row] === UNDER_STATE.NONE
                      ? ""
                      : field.underField[column][row]}
                  </div>
                );
            }
          });
        })}
      </main>
      {!isWin && isGameEnd && createPortal(<Results />, document.body)}
      <img
        src={mrBomb_mascot}
        width="200px"
        className="absolute -top-[130px] md:top-auto md:bottom-0 -right-20 md:-right-[200px] z-15"
      />
      {/* TODO: 관심사 분리하기. 현재 셀 컴포넌트에서 네비게이션 동작을 진행함 */}
      {isWin && createPortal(<CongratsCard />, document.body)}
      <div className="absolute transform md:-translate-y-1/2 translate-x-1/2 translate-x-0 md:top-1/2 md:-left-[80px] left-1/2 left-0 md:mt-0 mt-2 flex flex-col">
        <Button text={"다시하기"} onClick={() => handleReplay(false)} />
        <Button text={"메인으로"} onClick={() => location.reload(true)} />
      </div>
      {isWin ? <CongratsMessage /> : null}
    </div>
  );
}
