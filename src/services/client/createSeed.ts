export default function createSeed(string: string) {
  let seed = 0;

  for (let i = 0; i < string.length; i++) {
    seed += string.charCodeAt(i);
  }

  return seed;
}
