import { useSelector } from "react-redux";

import Entrance from "../pages/Entrance";
import GameBoard from "../pages/GameBoard";

function App() {
  const viewMode = useSelector((state) => state.bomb.viewMode);

  return viewMode === "entrance" ? <Entrance /> : <GameBoard />;
}

export default App;
