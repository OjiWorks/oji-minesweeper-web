"use client";

import GameField from "./GameField";
import GameInfo from "@/src/app/game/board/GameInfo";
import GameNavigation from "./GameNavigation";
import { useAppSelector } from "@/src/hooks/useRedux";
import { useRouter } from "next/navigation";

export default function GameBoard() {
  const router = useRouter();
  const { field } = useAppSelector((state) => state.bomb);
  if (!field.coverField.length && !field.underField.length)
    router.push("/game/config");

  return (
    <div className="flex">
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-x-auto select-none">
        <GameInfo />
        <div className="flex">
          <GameNavigation />
          <GameField />
        </div>
      </div>
    </div>
  );
}
