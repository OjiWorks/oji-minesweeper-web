import { useSelector } from "react-redux";

export default function GameField() {
  const field = useSelector(state => state.bomb.field);
  return (
    <main>
      메인보드
    </main>
  );
}
