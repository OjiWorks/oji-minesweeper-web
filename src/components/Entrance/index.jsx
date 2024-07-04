import { useDispatch } from "react-redux";
import { setGameInfo, toggleView } from "../../services/bomb";

import convertToBombRate from "../utils/converToBombRate";

export default function Entrance() {
  const dispatch = useDispatch();

  function handleGameStart(e) {
    e.preventDefault();

    const gameSetting = {
      userId: e.target[0].value,
      row: e.target[1].value,
      column: e.target[2].value,
      bombRate: convertToBombRate(e.target[3].value)
    };

    dispatch(toggleView());
    dispatch(setGameInfo(gameSetting));
  }

  return (
    <div className="md:flex flex flex-col justify-center items-center bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-400">
      <h1>BombYangGang</h1>
      <form onSubmit={handleGameStart}>
        <div>
          유저이름 : <br/>
          <input type="text" defaultValue="의성짱짱맨" required />
        </div>
        <div>
          가로 :
          <input min="9" max="30" defaultValue="9" type="number" required/>
          세로 :
          <input min="9" max="30" defaultValue="9" type="number" required/>
          난이도 :
          <select required>
            <option>초급</option>
            <option>중급</option>
            <option>고급</option>
          </select>
        </div>
        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">게임시작</button>
      </form>
    </div>
  );
}