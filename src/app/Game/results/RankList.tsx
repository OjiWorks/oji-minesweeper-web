"use client";

import type { MappedDaily, MappedTotal } from "@/src/utils/mapUserToUsername";
import RankedListItem from "@/src/components/RankedListItem";

type RankListProps = {
  lists: MappedDaily[] | MappedTotal[];
};

export default function RankList({ lists }: RankListProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl md:max-w-md shadow-lg">
        {/* header */}
        <div className="p-5 m-5 flex justify-center w-full rounded bg-yellow-300">
          <h1 className="text-2xl font-bold text-gray-700">🏆 리더보드</h1>
        </div>

        <div className="w-full bg-white p-4 rounded shadow">
          <ul className="space-y-2">
            {lists.map((item) => {
              const score =
                "daily_score" in item ? item.daily_score : item.total_score;
              return (
                <RankedListItem
                  key={item.username}
                  user={item.username}
                  score={score}
                />
              );
            })}
          </ul>
        </div>

        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          랭킹 더보기
        </button>
      </div>
    </div>
  );
}
