"use server";
import {
  getSortedDailyScores,
  getSortedTotalScores,
} from "@/src/services/server/scoreActions";
import RankList from "./RankList";
import { PostgrestError } from "@supabase/supabase-js";

export default async function Results() {
  const TOP_20 = 20;
  const [totalRanks, dailyRanks] = await Promise.all([
    getSortedTotalScores(TOP_20),
    getSortedDailyScores(TOP_20),
  ]);

  if (isPostgrestError(totalRanks) || isPostgrestError(dailyRanks)) {
    return <>에러가 발생하였습니다.</>;
  }

  return (
    <>
      {totalRanks && (
        <div aria-label="total score">
          <RankList lists={totalRanks} />
        </div>
      )}
      {dailyRanks && (
        <div aria-label="daily score">
          <RankList lists={dailyRanks} />
        </div>
      )}
    </>
  );
}

function isPostgrestError(obj: unknown): obj is PostgrestError {
  return obj instanceof Error && obj.name === "PostgrestError";
}
