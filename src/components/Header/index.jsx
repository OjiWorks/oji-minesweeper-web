import { useEffect, useState } from "react";

export default function Header() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timeId = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return (() => clearInterval(timeId));
  }, [timer]);

  return (
    <header className="md:flex flex flex-row justify-center items-center">
      <div className="m-4 w-[200px] bg-blue-300">
        폭탄수
      </div>
      <div className="m-4 w-[200px] bg-orange-300">
        깃발갯수
      </div>
      <div className="m-4 w-[200px] bg-red-400">
        시간 : {timer}
      </div>
    </header>
  );
}