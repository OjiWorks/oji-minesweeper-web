"use client";

import { useRouter } from "next/navigation";

import Button from "@components/Button";
import BoxContainer from "@components/BoxContainer";
import TextInput from "@components/TextInput";

import login from "./actions";

export default function Login() {
  const router = useRouter();

  function navigateToRegister() {
    router.push("/user/register", { scroll: false });
  }

  return (
    <BoxContainer hasLogo={true}>
      <form className="flex flex-col items-center p-10 justify-items-stretch">
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
        <div className="p-3">
          <Button formAction={login} text="로그인" />
          <Button type="button" onClick={navigateToRegister} text="회원가입" />
        </div>
      </form>
    </BoxContainer>
  );
}
