import { CoverState, UnderState, BombRate } from ".";

export interface BombRateTable {
  readonly [index: string]: BombRate;
}

export interface GameConfig {
  row: number;
  column: number;
  difficulty: BombRate;
}

export interface Field {
  coverField: CoverState[][] | [];
  underField: UnderState[][] | [];
}

export interface Timer {
  timeId: number;
  timeCount: number;
}

export interface BombRootState {
  gameConfig: GameConfig;
  field: Field;
  timer: Timer;
  isGameEnd: boolean;
  isUserWin: boolean;
  userId: string | null;
}
