"use client";

import { Game } from "./game/page";
import { User } from "./user/page";

export default function App() {
  /* FIXME: 토큰 유무에 따라 라우팅 user, game 조건부 랜더링 */
  return <Game />;
}
