"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/user/login");
    } else {
      router.push("/game");
    }
  }, []);
  return <div>BombYangGang</div>;
}
