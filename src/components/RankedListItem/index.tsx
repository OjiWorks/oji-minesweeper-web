interface RankedListItemProps {
  user: string;
  score: string;
}

export default function RankedListItem({ user, score }: RankedListItemProps) {
  return (
    <li className="flex justify-between p-2 bg-gray-100 rounded hover:bg-gray-200">
      <span className="font-medium">{user}</span>
      <span className="font-bold text-blue-500">{score}</span>
    </li>
  );
}
