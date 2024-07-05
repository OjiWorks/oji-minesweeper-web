import Lottie from "lottie-react";
import congrateLottie from "../../assets/congraturation_Lottie.json";

export default function CongratsCard() {
  return (
    <div>
      <Lottie animationData={congrateLottie} />
    </div>
  );
}
