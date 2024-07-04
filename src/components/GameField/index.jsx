import { useSelector, useDispatch } from "react-redux";

import { openButton, setButtonState } from "../../services/bomb";

export default function GameField() {
  const field = useSelector(state => state.bomb.field);
  const { row, column } = useSelector(state => state.bomb.gameSetting);
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
    <main className="grid grid-cols-9 grid-rows-9">
      {field.coverField.map((columnArray, column) => {
        return columnArray.map((element, row) => {
          switch (element) {
            case "covered":
              return <button onClick={() => handleLeftClick(column, row)} onContextMenu={(e) => changeButtonContents(e, row, column, 1)} className="duration-150 ease-in-out transform active:bg-amber-700 active:scale-95 w-6 h-6 bg-amber-600 border-2 border-black border-solid"></button>;

            case "flag":
              return <button onContextMenu={(e) => changeButtonContents(e, row, column, 2)} className="duration-150 ease-in-out transform active:bg-amber-700 active:scale-95 w-6 h-6 bg-amber-600 border-2 border-black border-solid">🚩</button>;

            case "question":
              return <button onContextMenu={(e) => changeButtonContents(e, row, column, 0)} className="duration-150 ease-in-out transform active:bg-amber-700 active:scale-95 w-6 h-6 bg-amber-600 border-2 border-black border-solid">？</button>;

            case "open":
              return <div>{field.underField[column][row]}</div>
          }
        });
      })}
    </main>
  );
}
