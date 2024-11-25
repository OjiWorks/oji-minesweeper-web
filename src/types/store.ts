import { CoverState, UnderState, BombRate, GameMode } from ".";

export interface BombRateTable {
  readonly [index: string]: BombRate;
}

export interface GameConfig {
  row: number;
  column: number;
  difficulty: BombRate;
  seed?: string;
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
  gameMode: GameMode;
  gameConfig: GameConfig;
  field: Field;
  timer: Timer;
  isGameEnd: boolean;
  isUserWin: boolean;
  userId: string | null;
}
