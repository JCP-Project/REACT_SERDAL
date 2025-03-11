import React, { useState } from "react";

interface TextInputProps {
  label: string;
  name: string;
  value?: string; // Optional: since we're managing local state, it can be optional
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  required?: boolean;
}

const TextInput = ({ label, name, type, required = false }: TextInputProps) => {
  const [localValue, setLocalValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalValue(value);
  };

  return (
    <div className="relative z-0 w-full my-8 group">
      <input
        type={type}
        name={name}
        id={name}
        className="block rounded-md px-2 py-1 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
        placeholder=" "
        value={localValue} // Bind to local state
        onChange={handleInputChange}
        required={required}
      />
      <label
        htmlFor={name}
        className="pl-2 top-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] 
                  peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                  peer-focus:-translate-y-6 peer-focus:z-10 peer-focus:border-primary
                  peer-bg-blue
                  "
      >
        {label}
      </label>
    </div>
  );
};

export default TextInput;
