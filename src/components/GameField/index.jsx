import { useSelector } from "react-redux";

export default function GameField() {
  const gameObj = useSelector(state => state.bomb.gameSetting);

  return (
    <main>
      메인보드
    </main>
  );
}
