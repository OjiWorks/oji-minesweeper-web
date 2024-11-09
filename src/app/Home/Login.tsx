import { Button } from "../../components/Button";

export function Login() {
  return (
    <div>
      <form>
        <div className="my-3">
          <label className="mr-2">유저이름</label>
          <input
            data-test="name-input"
            type="text"
            placeholder="이름을 입력해주세요"
            className="text-center"
            required
          />
        </div>
        <div className="my-3">
          <label className="mr-2">비밀번호</label>
          <input
            data-test="name-input"
            type="text"
            placeholder="비밀번호를 입력해주세요"
            className="text-center"
            required
          />
        </div>
        <Button text="로그인하기" />
      </form>
    </div>
  );
}
