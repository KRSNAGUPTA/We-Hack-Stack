import React from "react";

function Input({
  id,
  name,
  type = "text",
  placeholder = "",
  required = false,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

export default Input;
