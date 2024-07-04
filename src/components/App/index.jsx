import { useSelector } from "react-redux";

import Entrance from "../Entrance";
import GameBoard from "../GameBoard/index";

function App() {
  const viewMode = useSelector(state => state.bomb.viewMode);

  return (
    viewMode === "entrance" ? <Entrance /> : <GameBoard />
  );

}

export default App
