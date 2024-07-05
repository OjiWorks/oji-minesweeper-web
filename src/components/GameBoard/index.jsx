import GameField from "../GameField";
import Header from "../Header";

export default function GameBoard() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-orange-100">
      <Header />
      <GameField />
    </div>
  );
}
