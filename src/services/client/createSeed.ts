export default function createSeed(string: string) {
  const replacedString = string.replace(/-/gi, "") as string;
  const max = 5757575757575757;
  let seedString = "";

  for (let i = 0; i < replacedString.length; i++) {
    seedString += replacedString.charCodeAt(i);
  }

  return parseInt(seedString) / max;
}
