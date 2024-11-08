import { useDispatch } from "react-redux";
import { setField, setGameInfo, toggleView } from "../../services/bomb";

import NumberInput from "./NumberInput";
import { Button } from "../../components/Button";

import { CELL_STATE } from "../../CONSTANTS/index";
import convertToBombRate from "../../utils/converToBombRate";
import createUnderField from "../../utils/createField";

import logo from "../../../public/images/logo.png";

const entranceStyle = {
  bg: "fixed inset-0 flex flex-col items-center justify-center",
  container:
    "flex flex-col justify-center items-center p-6 bg-orange-200 rounded-xl",
  form: "flex flex-col items-center",
};

export default function Entrance() {
  const dispatch = useDispatch();

  function handleGameStart(e) {
    e.preventDefault();

    const gameSetting = {
      userId: e.target[0].value,
      row: +e.target[1].value,
      column: +e.target[2].value,
      bombRate: convertToBombRate(e.target[3].value),
    };

    const underField = createUnderField(
      gameSetting.row,
      gameSetting.column,
      gameSetting.bombRate
    );
    const coverField = Array(gameSetting.column).fill(
      Array(gameSetting.row).fill(CELL_STATE.COVERED)
    );

    dispatch(toggleView());
    dispatch(setGameInfo(gameSetting));
    dispatch(setField({ underField, coverField }));
  }

  return (
    <div className={entranceStyle.bg}>
      <div className={entranceStyle.container}>
        <img src={logo.src} className="my-4" />
        <form onSubmit={handleGameStart} className={entranceStyle.form}>
          <div className="my-3">
            <label>유저이름</label>
            <input
              data-test="name-input"
              type="text"
              placeholder="이름을 입력해주세요"
              className="text-center"
              required
              maxLength={5}
            />
          </div>
          <div className="my-3">
            <NumberInput label="가로" />
            <NumberInput label="세로" />
            <div className="my-3 flex justify-center">
              <label>난이도</label>
              <select className="py-2" required>
                <option>초급</option>
                <option>중급</option>
                <option>고급</option>
              </select>
            </div>
          </div>
          {/* TODO: 중앙 정렬 시켜주기 , h-10 px-6 font-semibold rounded-md
          bg-black text-white */}
          <Button text={"게임시작"} testId={"start-button"} />
        </form>
      </div>
    </div>
  );
}
