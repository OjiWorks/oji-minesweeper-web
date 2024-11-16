"use client";

import { useAppSelector } from "@/src/hooks/useRedux";

export default function CongratsMessage() {
  const timeCount = useAppSelector((state) => state.bomb.timer.timeCount);

  return (
    <div className="absolute top-0 md:bottom-[180px] md:top-auto transform translate-x-1/2 md:translate-x-0 translate-y-1 md:translate-y-0 right-1/2 md:-right-[195px] text-2xl md:text-xl text-center w-max md:w-[210px] z-30">
      <div className="relative bg-white p-2 rounded-lg shadow-lg w-xs border rounded">
        <p className="text-gray-700">
          {/* {userId}님 */}
          <br /> 축하합니다!
          <br />
          {timeCount}초 만에
          <br />
          클리어하셨습니다🎉
        </p>
        <div className=" md:block hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-[10px] border-t-white border-r-[10px] border-r-transparent border-l-[10px] border-l-transparent"></div>
      </div>
    </div>
  );
}
