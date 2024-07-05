import { useSelector, useDispatch } from "react-redux";

import { openButton, setButtonState } from "../../services/bomb";
import CongratsCard from "../CongratsCard";

export default function GameField() {
  const field = useSelector(state => state.bomb.field);
  const { row, column, bombRate } = useSelector(state => state.bomb.gameSetting);
  const dispatch = useDispatch();

  function changeButtonContents(e, row, column, index) {
    e.preventDefault();
    dispatch(setButtonState({ row, column, index }));
  }

  function handleLeftClick(column, row) {
    if (field.underField[column][row] === 9) return alert("게임끝");
    dispatch(openButton([column, row]));
  }

  return (
    <main className="grid grid-cols-9 grid-rows-9 border-4 border-amber-800 shadow-lg rounded bg-amber-100">
      {field.coverField.map((columnArray, column) => {
        return columnArray.map((element, row) => {
          switch (element) {
            case "covered":
              return (
                <button
                  onClick={() => handleLeftClick(column, row)}
                  onContextMenu={(e) => changeButtonContents(e, row, column, 1)}
                  className="w-9 h-9 text-lg bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-700  shadow-md transition-all duration-200 ease-in-out transform hover:from-amber-700 hover:to-amber-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
                ></button>
              );

            case "flag":
              return (
                <button
                  onContextMenu={(e) => changeButtonContents(e, row, column, 2)}
                  className="w-9 h-9 text-lg bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-700  shadow-md transition-all duration-200 ease-in-out transform hover:from-amber-700 hover:to-amber-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 flex items-center justify-center"
                >
                  🚩
                </button>
              );

            case "question":
              return (
                <button
                  onContextMenu={(e) => changeButtonContents(e, row, column, 0)}
                  className="w-9 h-9 text-lg bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-700 shadow-md transition-all duration-200 ease-in-out transform hover:from-amber-700 hover:to-amber-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 flex items-center justify-center font-bold"
                >
                  ?
                </button>
              );

            case "open":
              return (
                <div
                  className="w-9 h-9 text-lg bg-orange-200 border border-amber-500  text-center flex items-center justify-center shadow-inner font-semibold text-amber-900"
                >
                  {field.underField[column][row] === 0 ? "" : field.underField[column][row]}
                </div>
              );
          }
        });
      })}
    </main>
  );
}
