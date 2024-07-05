import Lottie from "lottie-react";
import gameOverLottie from "../../assets/game_over.json";

export default function GameOver() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-300 h-200" >
      <button className="z-20 custom-blackButton absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2" onClick={() => location.reload(true)} >다시하기</button>
      <Lottie
        animationData={gameOverLottie} loop={false} />
    </div>
  )
}
