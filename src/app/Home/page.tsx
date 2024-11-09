"use client";

import { GameSetting } from "./GameSetting";
import { Login } from "./Login";

import logo from "../../../public/images/logo.png";

export function Entrance() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-400 rounded-xl">
        <img src={logo.src} className="my-4" />
        {/* TODO: Login 로직 완성 후 Login, GameSetting 조건부 랜더링 */}
        <Login />
        <GameSetting />
      </div>
    </div>
  );
}
