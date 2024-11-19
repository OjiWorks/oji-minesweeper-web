"use client";

import { useSearchParams } from "next/navigation";
import BoxContainer from "@/src/components/BoxContainer";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  function renderError() {
    switch (errorMessage) {
      case "login":
        return (
          <>
            <h1 className="text-xl text-red-500">로그인 오류</h1>
            <p>아이디와 비밀번호를 확인해 주세요.</p>
            <a href="/user/login" className="mt-4 text-blue-500">
              돌아가기
            </a>
          </>
        );
      case "register":
        return (
          <>
            <h1 className="text-xl text-red-500">회원가입 오류</h1>
            <p>이미 등록된 이메일이거나 양식이 올바르지 않습니다.</p>
            <a href="/user/register" className="mt-4 text-blue-500">
              돌아가기
            </a>
          </>
        );
      default:
        return (
          <>
            <h1 className="text-xl text-red-500">알 수 없는 오류</h1>
            <p>문제가 발생했습니다. 다시 시도해주세요.</p>
            <a href="/" className="mt-4 text-blue-500">
              돌아가기
            </a>
          </>
        );
    }
  }

  return (
    <BoxContainer>
      <div className="flex flex-col items-center justify-center p-6">
        {renderError()}
      </div>
    </BoxContainer>
  );
}
