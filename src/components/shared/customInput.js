import React from "react";

const CustomInput = ({ name,value, placeholder, label, type, handleChange }) => {
  return (
    <div className="my-3 w-full">
      <label className="text-base" htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value||''}
        onChange={handleChange}
        className="block w-full border border-[#d9d9d9] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base text-sm font-medium p-2"
      />
    </div>
  );
};

export default CustomInput;
