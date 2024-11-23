"use server";

import { createClient } from "@/src/utils/supabase/server";

export async function getSortedDailyScores(count: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("daily_score")
    .select("daily_score")
    .order("daily_score", { ascending: true })
    .limit(count);

  if (error) {
    return error;
  }

  return data;
}

export async function insertDailyScore(user_id: string, new_score: number) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("update_daily_score", {
    user_id,
    new_score,
  });

  if (error) {
    return error;
  }
}

export async function getSortedTotalScores(column: string, count: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("total_score")
    .select(column)
    .order(column, { ascending: true })
    .limit(count);

  if (error) {
    return error;
  }

  return data;
}
