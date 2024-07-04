export default function UseNameInput() {
  return (
    <div className="my-3">
      <label>
        유저이름
      </label>
      <input type="text" defaultValue="의성짱짱맨" className="text-center" required />
    </div>
  );
}
