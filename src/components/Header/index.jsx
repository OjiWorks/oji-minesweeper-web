import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { row, column, bombRate } = useSelector(state => state.bomb.gameSetting);
  const [timer, setTimer] = useState(0);
  const coverField = useSelector(state => state.bomb.field.coverField);
  let count = 0;

  coverField?.forEach(x => (x?.forEach(y => { if (y === "flag") { count++ } })));

  useEffect(() => {
    const timeId = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return (() => clearInterval(timeId));
  }, [timer]);

  return (
    <header className="md:flex flex flex-row justify-center items-center m-4">
      <div className="m-4 w-[250px] text-xl px-3 py-2 bg-amber-300 text-gray-900 rounded shadow">
        폭탄수 : {Math.floor(row * column * bombRate)}
      </div>
      <div className="m-4 w-[250px] text-xl px-3 py-2 bg-amber-400 text-gray-900 rounded shadow">
        깃발갯수 : {count}
      </div>
      <div className="m-4 w-[250px] text-xl px-3 py-2 bg-amber-500 text-gray-900 rounded shadow">
        시간 : {timer}
      </div>
    </header>
  );
}