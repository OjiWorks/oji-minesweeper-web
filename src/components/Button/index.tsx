"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, ...props }: ButtonProps) {
  return (
    <button className="custom-blackButton m-1" {...props}>
      {text}
    </button>
  );
}
