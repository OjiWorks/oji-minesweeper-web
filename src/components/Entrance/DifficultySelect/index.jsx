export default function DifficultySelect() {
  return (
    <div className="my-3">
      <label>
        난이도
      </label>
      <select required>
        <option>초급</option>
        <option>중급</option>
        <option>고급</option>
      </select>
    </div>
  );
}
