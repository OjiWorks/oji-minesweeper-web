import { BombRootState } from "@/src/types/store";

const initialState: BombRootState = {
  gameMode: "single",
  gameConfig: {
    row: 0,
    column: 0,
    difficulty: 0.12,
  },
  field: {
    coverField: [],
    underField: [],
  },
  timer: {
    timeId: 0,
    timeCount: 0,
  },
  isGameEnd: false,
  isUserWin: false,
  userId: null,
};

export default initialState;
