export default function UseNameInput() {
  return (
    <div className="my-3">
      <label>
        유저이름
      </label>
      <input type="text" placeholder="이름을 입력해주세요" className="text-center" required maxLength={5}/>
    </div>
  );
}
