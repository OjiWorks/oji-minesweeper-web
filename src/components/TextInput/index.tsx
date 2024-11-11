import React from "react";

interface InputProps {
  label: string;
  placeholder: string;
  testId?: string;
}

export function TextInput({ label, placeholder, testId }: InputProps) {
  return (
    <div className="m-1">
      <label className="mr-2">{label}</label>
      <input
        data-test={testId}
        placeholder={placeholder}
        className="text-center"
        required
      />
    </div>
  );
}
