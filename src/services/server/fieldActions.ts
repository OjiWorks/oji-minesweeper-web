"use server";

import { createClient } from "@/src/utils/supabase/server";

import createUnderField from "../client/createField";
import { UnderState } from "@/src/types";

export async function getDailyField() {
  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("daily_field")
    .select("field", { count: "exact" })
    .limit(1);

  if (error) {
    return error;
  }

  if (!count) {
    const dailyField = createUnderField(10, 10, 0.2);
    const error = await insertDailyField(dailyField);

    if (error) {
      return error;
    }

    return dailyField;
  }

  const dailyField = data[0].field;

  return dailyField;
}

async function insertDailyField(field: UnderState[][]) {
  const supabase = await createClient();

  const { error } = await supabase.from("daily_field").insert({ field });

  if (error) {
    return error;
  }
}
