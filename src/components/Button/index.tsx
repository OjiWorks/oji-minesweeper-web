"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
}

export default function Button({
  className = "",
  text,
  ...props
}: ButtonProps) {
  return (
    <button className={`custom-blackButton m-1 ${className}`} {...props}>
      {text}
    </button>
  );
}
