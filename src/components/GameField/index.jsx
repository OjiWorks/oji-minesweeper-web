import { useSelector } from "react-redux";

export default function GameField() {
  const field = useSelector(state => state.bomb.field);
  const { row, column } = useSelector(state => state.bomb.gameSetting);
  console.log([row, column]);

  return (
    <main className="grid grid-cols-9 grid-rows-9 gap-1">
      {field.coverField.map((columnArray, column) => {
        return columnArray.map((element, row) => {
          switch (element) {
            case "covered":
              return <button className="w-6 h-6 bg-amber-700"></button>;

            case "flag":
              return <button>flag</button>;

            case "question":
              return <button>question</button>;

            case "open":
              return <div>{field.underField[column][row]}</div>
          }
        });
      })}
    </main>
  );
}
