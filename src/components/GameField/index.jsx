import { useSelector, useDispatch } from "react-redux";

import { openAroundButtons, openButtons, setButtonState } from "../../services/bomb";
import CongratsCard from "../CongratsCard";
import gang1 from "../../assets/bombgang_1.png"

export default function GameField() {
  const field = useSelector(state => state.bomb.field);
  const { row, column, bombRate } = useSelector(state => state.bomb.gameSetting);
  const dispatch = useDispatch();

  const theme = {
    close: "w-10 h-10 text-xl bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-700  shadow-md transition-all duration-200 ease-in-out transform hover:from-amber-700 hover:to-amber-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50",
    open: "w-10 h-10 text-xl bg-orange-200 border border-amber-500  text-center flex items-center justify-center shadow-inner font-semibold text-amber-900"
  }

  function changeButtonContents(row, column, index) {
    dispatch(setButtonState({ row, column, index }));
  }

  function handleLeftClick(column, row) {
    if (field.underField[column][row] === 9) return alert("게임끝");
    dispatch(openButtons([column, row]));
  }

  function handleBothClick(e, column, row) {
    const clickType = e.buttons;
    const BOTH_CLICK = 3;

    if (clickType === BOTH_CLICK) {
      e.preventDefault();
      dispatch(openAroundButtons([column, row]))
    }
  }

  return (
    <div className="relative">
      <main onContextMenu={(e) => {e.preventDefault()}} className="grid grid-cols-9 grid-rows-9 border-4 border-amber-800 shadow-lg rounded bg-amber-100">
        {field.coverField.map((columnArray, column) => {
          return columnArray.map((element, row) => {
            switch (element) {
              case "covered":
                return (
                  <button
                    onClick={() => handleLeftClick(column, row)}
                    onContextMenu={() => changeButtonContents(row, column, 1)}
                    className={theme.close}
                  ></button>
                );

              case "flag":
                return (
                  <button
                    onContextMenu={() => changeButtonContents(row, column, 2)}
                    className={theme.close}
                  >
                    🚩
                  </button>
                );

              case "question":
                return (
                  <button
                    onContextMenu={() => changeButtonContents(row, column, 0)}
                    className={theme.close}
                  >
                    ?
                  </button>
                );

              case "open":
                return (
                  <div
                    onMouseDown={(e) => handleBothClick(e, column, row)}
                  className={theme.open}
                  >
                    {field.underField[column][row] === 0 ? "" : field.underField[column][row]}
                  </div>
                );
            }
          });
        })}
      </main>
      <img src={gang1} width="200px" className="absolute bottom-0 -right-[200px]" />
    </div>
  );
}
