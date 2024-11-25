"use client";

import { useRef, useState } from "react";

import Button from "@components/Button";
import TextInput from "@components/TextInput";
import BoxContainer from "@components/BoxContainer";

import { register } from "@/src/services/server/authActions";
import isValidatedPassword from "@/src/utils/isValidatedPassword";
import isMatch from "@/src/utils/isMatch";
import { useRouter } from "next/navigation";

export default function Register() {
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);
  const [validateMessage, setValidateMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    if (!isValidatedPassword(formData.get("password") as string)) {
      setValidateMessage(
        "비밀번호는 '영어소문자'와 '숫자'를 포함한 6글자 이상이어야 합니다."
      );
      return;
    }

    if (
      !isMatch(
        formData.get("password") as string,
        formData.get("passwordConfirm") as string
      )
    ) {
      setValidateMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (validateMessage) setValidateMessage(null);
    await register(formData);
    // router.push("/users/login"); //FIXME: 중복
  }

  return (
    <BoxContainer title="회원가입">
      {validateMessage && <div>{validateMessage}</div>}
      <form className="flex flex-col">
        <div className="my-3 justify-items-end">
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
        <Button
          type="button"
          onClick={() => router.push("/users/login")}
          text="돌아가기"
        />
      </form>
    </BoxContainer>
  );
}
