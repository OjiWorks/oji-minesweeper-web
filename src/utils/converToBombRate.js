const bombRateTable = {
  초급: 0.03,
  중급: 0.15,
  고급: 0.20,
};

export default function convertToBombRate(difficulty = "") {
  return bombRateTable[difficulty];
}
