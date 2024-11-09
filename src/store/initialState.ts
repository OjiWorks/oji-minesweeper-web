import { BombRootState } from "./types";

const initialState: BombRootState = {
  gameSetting: {
    userId: "",
    row: 0,
    column: 0,
    bombRate: 0,
  },
  viewMode: "entrance", //TODO: Session Storage 로 이동. isPlaying? true: false
  field: {
    coverField: [],
    underField: [],
  },
  timer: {
    timeId: 0,
    timeCount: 0,
  },
  isGameEnd: false,
};

export default initialState;
