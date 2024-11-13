// TODO: 사용위치 확인하기
interface CellProps {
  value: string;
}

export default function Cell({ value }: CellProps) {
  return <button className="w-6 h-6 bg-amber-700">{value}</button>;
}
