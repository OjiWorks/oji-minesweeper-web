import { BombRootState } from "@src/types";

const initialState: BombRootState = {
  gameConfig: {
    row: 0,
    column: 0,
    bombRate: 0.12,
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
};

export default initialState;
