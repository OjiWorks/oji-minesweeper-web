import { RefObject } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement>;
  label: string;
  placeholder: string;
}

export function TextInput({ ref, label, placeholder, ...props }: InputProps) {
  return (
    <div className="m-1">
      <label className="mr-2">{label}</label>
      <input
        ref={ref}
        placeholder={placeholder}
        className="text-center"
        required
        {...props}
      />
    </div>
  );
}
