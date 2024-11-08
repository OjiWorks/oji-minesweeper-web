export function Button({ text, onClick = null, testId = null }) {
  return (
    <button
      data-test={testId}
      className="relative custom-blackButton transform right-1/2 -translate-x-1/2 md:mx-0 "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
