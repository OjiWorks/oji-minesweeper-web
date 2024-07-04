import { useDispatch } from "react-redux";
import { setGameInfo, toggleView } from "../../services/bomb";

import logo from "../../assets/textlogo.png"
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
    <div className="fixed inset-0 flex flex-col items-center justify-center ">
      <div className="flex flex-col justify-center items-center p-6 bg-slate-100 rounded-xl dark:bg-slate-400">
        <img src={logo} />
        <form onSubmit={handleGameStart} className="flex flex-col items-center">
          <div className="my-3">
            유저이름 <input type="text" defaultValue="의성짱짱맨" className="text-center" required />
          </div>
          <div className="my-3">
            가로
            <input min="9" max="30" defaultValue="9" type="number" className="text-center" required />칸
            세로
            <input min="9" max="30" defaultValue="9" type="number" className="text-center" required />칸
            <div className="my-3">
              난이도
              <select required>
                <option>초급</option>
                <option>중급</option>
                <option>고급</option>
              </select>
            </div>
          </div>
          <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">게임시작</button>
        </form>
      </div>
    </div>

  );
}