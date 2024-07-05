import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setTimer } from "../../services/bomb";

export default function Header() {
  const { row, column, bombRate } = useSelector(state => state.bomb.gameSetting);
  const isGameEnd = useSelector(state => state.bomb.isGameEnd);
  const timer = useSelector(state => state.bomb.timer.timeCount);
  const coverField = useSelector(state => state.bomb.field.coverField);
  const dispatch = useDispatch();
  let count = 0;

  coverField?.forEach(x => (x?.forEach(y => { if (y === "flag") { count++ } })));

  useEffect(() => {
    const timeId = setInterval(() => {
      dispatch(setTimer());
    }, 1000);

    if (isGameEnd) {
      clearInterval(timeId);
    }

    return (() => clearInterval(timeId));
  }, [timer, isGameEnd]);


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