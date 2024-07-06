import GameField from "../GameField";
import Header from "../Header";

export default function GameBoard() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Header />
      <GameField />
    </div>
  );
}
