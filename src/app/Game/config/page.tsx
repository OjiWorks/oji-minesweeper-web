"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useRedux";
import { setField, setGameMode, setGameConfig } from "@/src/store/bombSlice";

import Button from "@components/Button";

import logo from "@/public/images/logo.png";
import initializeFields from "@/src/services/client/initializeFields";
import { GameConfig } from "@/src/types/store";
import { useState } from "react";
import { BombRate } from "@/src/types";
import { getDailyField } from "@/src/services/server/fieldActions";
import { CoverState } from "@/src/types";

export default function Config() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { gameMode } = useAppSelector((state) => state.bomb);
  const [singleModeConfig, setSingleModeConfig] = useState<GameConfig>({
    row: 9,
    column: 9,
    difficulty: 0.12,
  });

  function handleGameStart(e: React.FormEvent) {
    e.preventDefault();

    if (gameMode === "single") {
      const field = initializeFields(singleModeConfig);

      dispatch(setGameConfig(singleModeConfig));
      dispatch(setField(field));
    }
    router.push("/game/board");
  }

  async function handleChallengeStart() {
    if (gameMode !== "challenge") {
      console.error("게임 모드가 챌린지 모드가 아닙니다.");
      return;
    }

    const challengeModeConfig: GameConfig = {
      row: 10,
      column: 10,
      difficulty: 0.2,
    };
    const underField = await getDailyField();
    const coverField = Array(challengeModeConfig.column).fill(
      Array(challengeModeConfig.row).fill("covered")
    ) as CoverState[][];

    if (Array.isArray(underField)) {
      const field = { underField, coverField };

      dispatch(setGameConfig(challengeModeConfig));
      dispatch(setField(field));

      router.push("/game/board");
    }

    if (underField instanceof Error) {
      alert("에러가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-400 rounded-xl md:max-w-md">
        <img src={logo.src} className="my-4" />
        <div>
          <Button
            text="싱글 모드"
            onClick={() => dispatch(setGameMode("single"))}
          />
          <Button
            text="챌린지 모드"
            onClick={() => {
              dispatch(setGameMode("challenge"));
            }}
          />
        </div>
        {gameMode === "single" ? (
          <form
            onSubmit={handleGameStart}
            className="flex flex-col items-center p-4"
          >
            <div>
              <span className="px-1">
                <label>가로</label>
                <input
                  min="9"
                  max="30"
                  defaultValue="9"
                  type="number"
                  onChange={(e) => {
                    const prev = singleModeConfig;
                    setSingleModeConfig({
                      ...prev,
                      row: Number(e.target.value),
                    });
                  }}
                  className="text-center rounded w-11 h-6 py-4 m-1"
                  required
                />
                칸
              </span>
              <span className="px-1">
                <label>세로</label>
                <input
                  min="9"
                  max="30"
                  defaultValue="9"
                  type="number"
                  onChange={(e) => {
                    const prev = singleModeConfig;
                    setSingleModeConfig({
                      ...prev,
                      column: Number(e.target.value),
                    });
                  }}
                  className="text-center rounded w-11 h-6 py-4 m-1"
                  required
                />
                칸
              </span>
            </div>
            <div className="my-3">
              <label className="mr-1">난이도</label>
              <select
                className="py-2 rounded"
                onChange={(e) => {
                  const prev = singleModeConfig;
                  setSingleModeConfig({
                    ...prev,
                    column: Number(e.target.value) as BombRate,
                  });
                }}
                required
              >
                <option value={0.12}>초급</option>
                <option value={0.15}>중급</option>
                <option value={0.2}>고급</option>
              </select>
            </div>
            <Button text={"게임시작"} data-test={"start-button"} />
          </form>
        ) : (
          <div>
            <div className="p-5 m-2 bg-orange-200 rounded">
              <p className="text-sm font-sans">
                챌린지 모드는 전 세계 유저들과 동일한 맵에서 24시간 동안
                경쟁하는 모드입니다. 짧은 시간 안에 클리어할수록 높은 점수를
                받을 수 있습니다. 지금 랭킹에 도전해 보세요! 🚀
              </p>
            </div>
            <div className="flex justify-center p-2">
              <Button text="도전하기" onClick={handleChallengeStart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
