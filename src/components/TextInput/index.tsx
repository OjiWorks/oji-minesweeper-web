import { RefObject } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement>;
  label: string;
  placeholder: string;
}

export default function TextInput({
  ref,
  label,
  placeholder,
  ...props
}: InputProps) {
  return (
    <div className="m-1 min-w-60">
      <label className="mr-2">{label}</label>
      <input
        ref={ref}
        placeholder={placeholder}
        className="py-1 px-2 rounded md:w-56"
        required
        {...props}
      />
    </div>
  );
}
