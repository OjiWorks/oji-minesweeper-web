import Lottie from "lottie-react";
import congrateLottie from "../../assets/congraturation_Lottie.json";

function CongratsCard() {
  return (
    <div>
      <Lottie animationData={congrateLottie} />
    </div>
  );
}

export default CongratsCard;