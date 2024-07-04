import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { row, column, bombRate } = useSelector(state => state.bomb.gameSetting);
  const field = useSelector(state => state.bomb.field);
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
    <header className="md:flex flex flex-row justify-center items-center">
      <div className="m-4 w-[200px] bg-blue-300">
        폭탄수 : {Math.floor(row * column * bombRate)}
      </div>
      <div className="m-4 w-[200px] bg-orange-300">
        깃발갯수 : {count}
      </div>
      <div className="m-4 w-[200px] bg-red-400">
        시간 : {timer}
      </div>
    </header>
  );
}