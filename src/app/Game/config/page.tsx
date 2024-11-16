"use client";

import { useState } from "react";
import { useAppDispatch } from "@/src/hooks/useRedux";
import { useRouter } from "next/navigation";

import Button from "@components/Button";

import { setField, setGameConfig } from "@/src/store/bombSlice";
import { GameMode } from "@/src/types";

import logo from "@/public/images/logo.png";
import extractGameConfig from "@/src/services/client/extractGameConfig";
import initializeFields from "@/src/services/client/initializeFields";

export default function Config() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [playMode, setPlayMode] = useState<GameMode>("single");

  function handleGameStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const gameConfig = extractGameConfig(form);

    const { row, column, difficulty } = gameConfig;
    const field = initializeFields(row, column, difficulty);

    dispatch(setGameConfig(gameConfig));
    dispatch(setField(field));

    router.push("/game/board");
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-400 rounded-xl">
        <img src={logo.src} className="my-4" />
        <div>
          <Button text="싱글 모드" onClick={() => setPlayMode("single")} />
          <Button text="챌린지 모드" onClick={() => setPlayMode("Challenge")} />
        </div>
        {playMode === "single" ? (
          <form onSubmit={handleGameStart} className="flex flex-col items-center">
            <div className="my-3">
              <span className="p-1">
                <label className="mr-2">가로</label>
                <input min="9" max="30" defaultValue="9" type="number" className="text-center w-9 h-6 py-4" required />
                칸
              </span>
              <span className="p-1">
                <label className="mr-2">세로</label>
                <input min="9" max="30" defaultValue="9" type="number" className="text-center w-9 h-6 py-4" required />
                칸
              </span>
            </div>
            <div className="my-3">
              <label className="mr-2">난이도</label>
              <select className="py-2" required>
                <option>초급</option>
                <option>중급</option>
                <option>고급</option>
              </select>
            </div>
            <Button text={"게임시작"} data-test={"start-button"} />
          </form>
        ) : (
          // TODO: 난이도별 맵 생성 요청함수 연결
          <div>
            <Button text="쉬움" />
            <Button text="보통" />
            <Button text="어려움" />
          </div>
        )}
      </div>
    </div>
  );
}
