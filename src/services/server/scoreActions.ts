"use server";

import { createClient } from "@/src/utils/supabase/server";

import mapUserToUsername from "@/src/utils/mapUserToUsername";

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

  function isValidData(
    items: typeof data
  ): items is { daily_score: number; user: { username: string } }[] {
    if (!items) {
      return false;
    }

    return items.every((data) => {
      data.user && data.daily_score && data.user.username;
    });
  }

  if (isValidData(data)) {
    return mapUserToUsername(data);
  }
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

  function isValidData(
    items: typeof data
  ): items is { total_score: number; user: { username: string } }[] {
    if (!items) {
      return false;
    }

    return items.every((data) => {
      data.user && data.total_score && data.user.username;
    });
  }

  if (isValidData(data)) {
    return mapUserToUsername(data);
  }
}
