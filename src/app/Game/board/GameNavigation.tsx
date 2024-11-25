"use client";

import { useAppDispatch, useAppSelector } from "@/src/hooks/useRedux";
import Button from "@/src/components/Button";
import initializeFields from "@/src/services/client/initializeFields";
import {
  setField,
  setGameConfig,
  setIsGameEnd,
  setTimerReset,
} from "@/src/store/bombSlice";
import { useRouter } from "next/navigation";

export default function GameNavigation() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { gameConfig } = useAppSelector((state) => state.bomb);

  function handleReplay() {
    const field = initializeFields(gameConfig);

    dispatch(setGameConfig(gameConfig));
    dispatch(setField(field));
    dispatch(setIsGameEnd(false));
    dispatch(setTimerReset());
  }

  return (
    <div className="flex flex-col">
      <Button text={"다시하기"} onClick={handleReplay} />
      <Button text={"메인으로"} onClick={() => router.push("/")} />
    </div>
  );
}
