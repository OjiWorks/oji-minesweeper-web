export default function isValidated(input: string) {
  return input.match(/(?=.*\d)(?=.*[a-z]).{8,}/);
}
