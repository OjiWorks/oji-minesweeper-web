"use client";

import { useAppSelector } from "../hooks/useRedux";

import { Game } from "./Game/page";
import { User } from "./User/page";

export default function App() {
  const viewMode = useAppSelector((state) => state.viewMode);
  /* FIXME: 토큰 유무에 따라 라우팅 user, game 조건부 랜더링, viewMode state wjdfl */

  return viewMode === "entrance" ? <User /> : <Game />;
}
