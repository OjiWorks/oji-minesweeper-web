"use client";

import Lottie from "lottie-react";
import explosion from "@/src/assets/animation/explosion.json";

import { useAppSelector, useAppDispatch } from "@/src/hooks/useRedux";
import Button from "@components/Button";

import createUnderField from "@/src/services/client/createField";
import { setGameConfig, setField, setTimerReset, setIsGameEnd } from "@/src/store/bombSlice";
import { CoverState } from "@/src/types";

//FIXME: 이전에는 실패했을 때만 결과만 보여줬음, 공동 결과창으로 관리
export default function Results() {
  const dispatch = useAppDispatch();
  const { gameConfig } = useAppSelector((state) => state.bomb);
  const { row, column, difficulty } = gameConfig;

  function handleReplay() {
    const underField = createUnderField(row, column, difficulty);
    const coverField = Array(column).fill(Array(row).fill("covered")) as CoverState[][];

    dispatch(setGameConfig(gameConfig));
    dispatch(setField({ underField, coverField }));
    dispatch(setIsGameEnd(false));
    dispatch(setTimerReset());
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-300 h-200">
      {/* FIXME: 위치 중앙정렬 시켜주기 className="z-20 custom-blackButton absolute top-1/2 transform
      -translate-x-1/2 -translate-y-1/2 left-1/2" */}
      <Button text={"다시하기"} onClick={() => handleReplay()} />
      <Lottie animationData={explosion} loop={false} />
    </div>
  );
}
