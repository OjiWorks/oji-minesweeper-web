"use client";

import { useRouter } from "next/navigation";

import Button from "@components/Button";
import BoxContainer from "@components/BoxContainer";
import TextInput from "@components/TextInput";

import login from "./actions";

export default function Login() {
  const router = useRouter();

  function navigateToRegister() {
    router.push("/users/register", { scroll: false });
  }

  function navigateToGame() {
    router.push("/game", { scroll: false });
  }

  return (
    <BoxContainer hasLogo={true}>
      <div className="flex flex-col items-center p-10 justify-items-stretch">
        <form className="flex flex-row gap-1">
          <div className="flex flex-col items-end">
            <TextInput
              type="email"
              label="이메일"
              name="email"
              placeholder="이메일을 입력하세요"
            />
            <TextInput
              type="password"
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button className="custom-whiteButton" formAction={login}>
            로그인
          </button>
        </form>
        <div className="p-3">
          <Button type="button" onClick={navigateToRegister} text="회원가입" />
          <Button
            type="button"
            onClick={navigateToRegister}
            text="테스터 이용하기"
          />
        </div>
      </div>
    </BoxContainer>
  );
}
