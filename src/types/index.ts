export type CoverState = "flag" | "question" | "open" | "covered";
export type UnderState = "bomb" | "nonBomb" | number;
export type GameMode = "single" | "Challenge";
export type BombRate = 0.12 | 0.15 | 0.2;

interface RateTable {
  readonly [index: string]: BombRate;
}

export const bombRate: RateTable = {
  초급: 0.12,
  중급: 0.15,
  고급: 0.2,
};

/* Store */
export interface GameConfig {
  row: number;
  column: number;
  bombRate: BombRate;
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
}
