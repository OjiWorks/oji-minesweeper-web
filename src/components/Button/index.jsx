export function Button({ text, onClick = null }) {
  return (
    <button
      className="relative custom-blackButton transform right-1/2 -translate-x-1/2 md:mx-0 "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
