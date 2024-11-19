"use client";

import { useRef, useState } from "react";

import Button from "@components/Button";
import TextInput from "@components/TextInput";
import BoxContainer from "@components/BoxContainer";

import register from "./actions";
import isValidated from "@/src/utils/isValidated";
import isMatch from "@/src/utils/isMatch";

export default function Register() {
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);
  const [validateMessage, setValidateMessage] = useState<string | null>(null);

  function handleSubmit() {
    if (!isValidated(password.current!.value)) {
      setValidateMessage(
        "비밀번호는 '영어소문자'와 '특수문자'를 포함해야합니다."
      );
      return;
    }

    if (!isMatch(password.current!.value, passwordConfirm.current!.value)) {
      setValidateMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    register;
  }

  return (
    <BoxContainer title="회원가입">
      {validateMessage && <div>{validateMessage}</div>}
      <form className="flex flex-col items-center ">
        <div className="my-3">
          <TextInput
            type="email"
            label="이메일"
            name="email"
            placeholder="이메일을 입력해주세요"
          />
          <TextInput
            label="닉네임"
            name="username"
            placeholder="닉네임을 입력해주세요"
          />
          <TextInput
            ref={password}
            type="password"
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <TextInput
            ref={passwordConfirm}
            type="password"
            label="비밀번호 확인"
            name="passwordConfirm"
            placeholder="비밀번호를 재입력해주세요"
          />
        </div>
        <Button formAction={handleSubmit} text="등록하기" />
      </form>
    </BoxContainer>
  );
}
