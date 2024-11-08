import Lottie from "lottie-react";
import gameOverLottie from "../../assets/game_over.json";

import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../components/Button";

import createUnderField from "../../utils/createField";
import {
  setGameInfo,
  setField,
  setTimerReset,
  setIsGameEnd,
} from "../../services/bomb";
import { CELL_STATE } from "../../CONSTANTS";

//FIXME: 이전에는 실패했을시의 결과만 보여줬음, 공동 결과창으로 관리
export function Results() {
  const { userId, row, column, bombRate } = useSelector(
    (state) => state.bomb.gameSetting
  );
  const dispatch = useDispatch();

  function handleReplay() {
    const underField = createUnderField(row, column, bombRate);
    const coverField = Array(column).fill(Array(row).fill(CELL_STATE.COVERED));

    dispatch(setGameInfo({ userId, row, column, bombRate }));
    dispatch(setField({ underField, coverField }));
    dispatch(setIsGameEnd(false));
    dispatch(setTimerReset());
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-300 h-200">
      {/* FIXME: 위치 중앙정렬 시켜주기 className="z-20 custom-blackButton absolute top-1/2 transform
      -translate-x-1/2 -translate-y-1/2 left-1/2" */}
      <Button text={"다시하기"} onClick={() => handleReplay()} />
      <Lottie animationData={gameOverLottie} loop={false} />
    </div>
  );
}
