type PropsTypes = {
  daily_score?: number;
  total_score?: number;
  user: { username: string };
};

export default function mapUserToUsername(scoreData: PropsTypes[]) {
  return scoreData.map((data) => {
    const { user, ...rest } = data;
    return {
      ...rest,
      username: user.username,
    };
  });
}
