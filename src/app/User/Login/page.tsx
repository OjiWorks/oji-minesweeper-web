"use client";

import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";

export function Login() {
  return (
    <form className="flex flex-col items-center p-10">
      {/* <div className="my-3"> */}
      <TextInput label="이메일" placeholder="이메일을 입력하세요" />
      <TextInput label="비밀번호" placeholder="비밀번호를 입력하세요" />
      {/* </div> */}
      {/* TODO: onClick 요청 연결하기 */}
      <Button text="로그인하기" />
    </form>
  );
}
