import React, { useState } from "react";

interface TextAreaProps {
  label: string;
  name: string;
  value?: string; // Optional: since we're managing local state, it can be optional
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextArea = ({ label, name, required = false }: TextAreaProps) => {
  const [localValue, setLocalValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setLocalValue(value);
  };

  return (
    <div className="relative z-0 w-full mb-5 group">
      <textarea
        name={name}
        id={name}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
        placeholder=" "
        value={localValue} // Bind to local state
        onChange={handleInputChange}
        required={required}
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
