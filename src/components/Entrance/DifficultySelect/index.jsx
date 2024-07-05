export default function DifficultySelect() {
  return (
    <div className="my-3 flex justify-center">
      <label>
        난이도
      </label>
      <select className="py-2" required>
        <option>초급</option>
        <option>중급</option>
        <option>고급</option>
      </select>
    </div>
  );
}
