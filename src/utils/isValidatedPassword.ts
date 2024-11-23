export default function isValidatedPassword(input: string) {
  // 영어 소문자, 숫자를 포함한 6글자를 허용합니다.
  return input.match(/(?=.*\d)(?=.*[a-z]).{6,}/);
}
