import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import congrateLottie from "../../assets/congraturation_Lottie.json";

export default function CongratsCard() {
  const { userId } = useSelector((state) => state.bomb.gameSetting);
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-300 h-100" >
      <Lottie animationData={congrateLottie} />
    </div>
  );
}
