type Daily = {
  daily_score: number;
  user: { username: string };
};
type Total = {
  total_score: number;
  user: { username: string };
};

export type MappedDaily = {
  daily_score: number;
  username: string;
};

export type MappedTotal = {
  total_score: number;
  username: string;
};

export default function mapUserToUsername(scoreData: Daily[]): MappedDaily[];
export default function mapUserToUsername(scoreData: Total[]): MappedTotal[];
export default function mapUserToUsername(
  scoreData: Daily[] | Total[]
): MappedDaily[] | MappedTotal[] {
  function isDailyArray(items: (Daily | Total)[]): items is Daily[] {
    return items.every((data) => "daily_score" in data);
  }

  if (isDailyArray(scoreData)) {
    return scoreData.map((data) => {
      const { user, daily_score } = data;
      return {
        daily_score,
        username: user.username,
      };
    });
  }

  return scoreData.map((data) => {
    const { user, total_score } = data;
    return {
      total_score,
      username: user.username,
    };
  });
}
