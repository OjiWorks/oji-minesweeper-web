"use client";

import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";

export default function Register() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-400 rounded-xl">
        <form className="flex flex-col items-center p-10">
          <div className="my-3">
            <TextInput label="이메일" placeholder="사용할 이메일을 입력해주세요" />
            <TextInput label="닉네임" placeholder="사용할 닉네임을 입력해주세요" />
            <TextInput label="비밀번호" placeholder="비밀번호를 입력해주세요" />
            <TextInput label="비밀번호 확인" placeholder="비밀번호를 재입력해주세요" />
          </div>
          {/* TODO: onClick 요청 연결하기 */}
          <Button text="등록하기" />
        </form>
      </div>
    </div>
  );
}
