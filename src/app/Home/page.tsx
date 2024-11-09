"use client";

import { GameSetting } from "./GameSetting";
import { Login } from "./Login";
import logo from "../../../public/images/logo.png";

export function Entrance() {
  return (
    <div className="relative fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-200 rounded-xl" />
      <div className="flex flex-col justify-center items-center p-6 bg-orange-200 rounded-xl">
        <img src={logo.src} className="my-4" />
        <Login />
        <GameSetting />
      </div>
    </div>
  );
}
