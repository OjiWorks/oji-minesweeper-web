"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({ text, ...props }: ButtonProps) {
  return (
    <button className="custom-blackButton" {...props}>
      {text}
    </button>
  );
}
