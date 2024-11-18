"use client";

import Button from "@components/Button";
import { TextInput } from "@components/TextInput";

import login from "./actions";

export default function Login() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-400 rounded-xl">
        <form className="flex flex-col items-center p-10">
          <TextInput
            label="이메일"
            name="email"
            placeholder="이메일을 입력하세요"
          />
          <TextInput
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
          <Button formAction={login} text="로그인하기" />
        </form>
      </div>
    </div>
  );
}
