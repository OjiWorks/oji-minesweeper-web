"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/utils/supabase/client";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/game");
      } else {
        router.push("/user/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-orange-400 rounded-xl">
        <div className="flex flex-col items-center justify-center p-6">
          <p>...Loading</p>
        </div>
      </div>
    </div>
  );
}
