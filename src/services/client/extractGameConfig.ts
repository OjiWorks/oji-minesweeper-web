import { BombRateTable, GameConfig } from "@/src/types/store";

export default function extractGameConfig(form: HTMLFormElement): GameConfig {
  const bombRate: BombRateTable = {
    초급: 0.12,
    중급: 0.15,
    고급: 0.2,
  };

  const row = +(form[0] as HTMLInputElement).value;

  const column = +(form[1] as HTMLInputElement).value;

  const difficultyName = (form[2] as HTMLInputElement).value;
  const difficulty = bombRate[difficultyName];

  return { row, column, difficulty };
}
