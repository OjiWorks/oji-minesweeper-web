"use server";

import { createClient } from "@/src/utils/supabase/client";

export async function insertDailyScore(user_id: string, new_score: number) {
  const supabase = createClient();

  const { error } = await supabase.rpc("update_daily_score", {
    user_id,
    new_score,
  });

  if (error) {
    return error;
  }
}
