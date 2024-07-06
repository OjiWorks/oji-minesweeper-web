const entranceStyle = {
  button: "h-10 px-6 font-semibold rounded-md bg-black text-white"
};

export default function StartButton() {
  return (
    <button data-test="start-button" className="custom-blackButton" type="submit">
      게임시작
    </button>
  );
}
