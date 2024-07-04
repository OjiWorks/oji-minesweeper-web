import { useDispatch } from "react-redux";
import { setField, setGameInfo, toggleView } from "../../services/bomb";

import UseNameInput from "./UserNameInput";
import NumberInput from "./NumberInput";
import DifficultySelect from "./DifficultySelect";
import StartButton from "./StartButton";

import convertToBombRate from "../utils/converToBombRate";
import createUnderField from "../utils/createField";

import logo from "../../assets/textlogo.png"

const entranceStyle = {
  bg: "fixed inset-0 flex flex-col items-center justify-center",
  container: "flex flex-col justify-center items-center p-6 bg-slate-100 rounded-xl dark:bg-slate-400",
  form: "flex flex-col items-center"
};

export default function Entrance() {
  const dispatch = useDispatch();

  function handleGameStart(e) {
    e.preventDefault();

    const gameSetting = {
      userId: e.target[0].value,
      row: +e.target[1].value,
      column: +e.target[2].value,
      bombRate: convertToBombRate(e.target[3].value)
    };

    const underField = createUnderField(gameSetting.row, gameSetting.column, gameSetting.bombRate);
    const coverField = Array(gameSetting.column).fill(Array(gameSetting.row).fill("covered"));

    dispatch(toggleView());
    dispatch(setGameInfo(gameSetting));
    dispatch(setField({ underField, coverField }));
  }

  return (
    <div className={entranceStyle.bg}>
      <div className={entranceStyle.container}>
        <img src={logo} />
        <form onSubmit={handleGameStart} className={entranceStyle.form}>
          <UseNameInput />
          <div className="my-3">
            <NumberInput type="가로" />
            <NumberInput type="세로" />
            <DifficultySelect />
          </div>
          <StartButton />
        </form>
      </div>
    </div>
  );
}
