"use client";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setField, setGameInfo, toggleView } from "../../../services/bomb";

import { Button } from "../../../components/Button";

import { CELL_STATE } from "../../../CONSTANTS/index";
import convertToBombRate from "../../../utils/converToBombRate";
import createUnderField from "../../../utils/createField";
import { gameInfo } from "../../../store/types";

export function Settings() {
  const [playMode, setPlayMode] = useState("single");

  const dispatch = useDispatch();

  function handleGameStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const gameSetting: gameInfo = {
      userId: (form[0] as HTMLInputElement).value,
      row: +(form[1] as HTMLInputElement).value,
      column: +(form[2] as HTMLInputElement).value,
      bombRate: convertToBombRate((form[3] as HTMLInputElement).value),
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

  return playMode === "single" ? (
    <form onSubmit={handleGameStart} className="flex flex-col items-center">
      <div className="my-3">
        <label className="mr-2">유저이름</label>
        <input
          data-test="name-input"
          type="text"
          placeholder="이름을 입력해주세요"
          className="text-center"
          required
        />
      </div>
      <div className="my-3">
        <span className="p-1">
          <label className="mr-2">가로</label>
          <input
            min="9"
            max="30"
            defaultValue="9"
            type="number"
            className="text-center w-9 h-6 py-4"
            required
          />
          칸
        </span>
        <span className="p-1">
          <label className="mr-2">세로</label>
          <input
            min="9"
            max="30"
            defaultValue="9"
            type="number"
            className="text-center w-9 h-6 py-4"
            required
          />
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
      <Button text={"게임시작"} testId={"start-button"} />
    </form>
  ) : (
    <div>
      <Button text="쉬움" />
      <Button text="보통" />
      <Button text="어려움" />
    </div>
  );
}
