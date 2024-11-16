"use client";

import { useAppDispatch, useAppSelector } from "@/src/hooks/useRedux";
import Button from "@/src/components/Button";
import initializeFields from "@/src/services/client/initializeFields";
import { setField, setGameConfig, setIsGameEnd, setIsUserWin, setTimerReset } from "@/src/store/bombSlice";
import { useRouter } from "next/navigation";

export default function GameNavigation() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { gameConfig } = useAppSelector((state) => state.bomb);
  const { row, column, difficulty } = gameConfig;

  function handleReplay() {
    const field = initializeFields(row, column, difficulty);

    dispatch(setGameConfig({ row, column, difficulty }));
    dispatch(setField(field));
    dispatch(setIsGameEnd(false));
    dispatch(setTimerReset());
    setIsUserWin(false);

    router.push("/game/board");
  }

  return (
    <div className="absolute transform md:-translate-y-1/2 translate-x-0 md:top-1/2 md:-left-[80px] left-0 md:mt-0 mt-2 flex flex-col">
      <Button text={"다시하기"} onClick={handleReplay} />
      <Button text={"메인으로"} onClick={() => router.push("/")} />
    </div>
  );
}
