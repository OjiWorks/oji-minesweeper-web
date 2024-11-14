"use client";

import GameField from "./GameField";
import Header from "@components/Header";

export default function GameBoard() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-x-auto select-none">
      <Header />
      <GameField />
    </div>
  );
}
