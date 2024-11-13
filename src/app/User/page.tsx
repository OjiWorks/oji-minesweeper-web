"use client";

import { Login } from "./login/page";
import logo from "../../../public/images/logo.png";

export function User() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-400 rounded-xl">
        <img src={logo.src} className="my-4" />
        {/* FIXME: 토큰 유무에 따라 라우팅 Login, GameSetting 조건부 랜더링 */}
        <Login />
      </div>
    </div>
  );
}
