"use client";

import { useAppSelector } from "../hooks/useRedux";
import { Entrance } from "./Home/page";
import GameBoard from "../pages/GameBoard";

function App() {
  const viewMode = useAppSelector((state) => state.viewMode);

  return viewMode === "entrance" ? <Entrance /> : <GameBoard />;
}

export default App;
