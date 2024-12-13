"use server";

import { createClient } from "@/src/utils/supabase/server";

export async function getSortedDailyScores(count: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("daily_score")
    .select(
      `
    daily_score,
    user (
      username
      )
      `
    )
    .order("daily_score", { ascending: true })
    .limit(count);

  if (error) {
    return error;
  }

  return data;
}

export async function getSortedTotalScores(count: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("total_score")
    .select(
      `
    total_score,
    user (
      username
      )
      `
    )
    .order("total_score", { ascending: true })
    .limit(count);

  if (error) {
    return error;
  }

  return data;
}
