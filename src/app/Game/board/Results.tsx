"use client";

import Lottie from "lottie-react";
import explosion from "@/src/assets/animation/explosion.json";

import { useAppSelector, useAppDispatch } from "@/src/hooks/useRedux";
import Button from "@components/Button";

import createUnderField from "@/src/services/client/createField";
import {
  setGameConfig,
  setField,
  setTimerReset,
  setIsGameEnd,
} from "@/src/store/bombSlice";
import { CoverState } from "@/src/types";

export default function Results() {
  const dispatch = useAppDispatch();
  const { gameMode, gameConfig, field } = useAppSelector((state) => state.bomb);
  const { row, column, difficulty } = gameConfig;

  function handleReplay() {
    const underField =
      gameMode === "single"
        ? createUnderField(row, column, difficulty)
        : field.underField;

    const coverField = Array(column).fill(
      Array(row).fill("covered")
    ) as CoverState[][];

    dispatch(setGameConfig(gameConfig));
    dispatch(setField({ underField, coverField }));
    dispatch(setIsGameEnd(false));
    dispatch(setTimerReset());
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
        text={"다시하기"}
        onClick={() => handleReplay()}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90">
        <Lottie animationData={explosion} loop={false} />
      </div>
    </div>
  );
}
