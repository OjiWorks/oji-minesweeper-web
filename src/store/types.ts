export interface gameInfo {
  userId: string;
  row: number;
  column: number;
  bombRate: number;
}

export interface BombRootState {
  gameSetting: gameInfo;
  viewMode: "entrance" | "gameBoard"; //TODO: Session Storage 로 이동. isPlaying? true: false
  field: {
    coverField: string[][];
    underField: number[][];
  };
  timer: {
    timeId: number;
    timeCount: number;
  };
  isGameEnd: boolean;
}
