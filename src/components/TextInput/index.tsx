interface InputProps {
  label: string;
  placeholder: string;
}

export function TextInput({ label, placeholder, ...props }: InputProps) {
  return (
    <div className="m-1">
      <label className="mr-2">{label}</label>
      <input placeholder={placeholder} className="text-center" required {...props} />
    </div>
  );
}
