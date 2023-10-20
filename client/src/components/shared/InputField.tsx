import React from 'react';

interface InputFieldProps {
  label: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-8">
      <div className="mb-1 text-base text-gray-500 font-medium">{label}</div>
      <input className="p-3 bg-default w-full" type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;
