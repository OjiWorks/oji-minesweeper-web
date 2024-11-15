"use client";

function noop(): void {}

type ButtonProps = {
  text: string;
  onClick?: () => void;
  testId?: string;
};

export function Button({ text, onClick = noop, ...props }: ButtonProps) {
  return (
    <button className="custom-blackButton " onClick={onClick} {...props}>
      {text}
    </button>
  );
}
