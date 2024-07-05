import { useSelector } from "react-redux";

export default function CongratsMessage() {
  const { userId } = useSelector((state) => state.bomb.gameSetting);
  return (
    <div className="absolute top-0 transform -right-[195px] text-xl text-center w-[210px]">
      <div class="relative bg-white p-2 rounded-lg shadow-lg w-xs">
        <p class="text-gray-700">
          {userId}님
          <br /> 축하합니다!
          <br />xxx초 만에
          <br />클리어하셨습니다🎉</p>
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-[10px] border-t-white border-r-[10px] border-r-transparent border-l-[10px] border-l-transparent"></div>
      </div>
    </div>
  );
}