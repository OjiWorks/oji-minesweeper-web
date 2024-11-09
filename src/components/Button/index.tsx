function noop(): void {}

type ButtonProps = {
  text: string;
  onClick?: () => void;
  testId?: string;
};

export function Button({ text, onClick = noop, testId }: ButtonProps) {
  return (
    <button
      data-test={testId}
      className="custom-blackButton "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
