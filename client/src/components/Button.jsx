import React from "react";

function Button({
  name = "button",
  onClick,
  type = "button",
  variant = "default",
  disabled = false,
  className = "", // Add className prop with default empty string
  children, // Add support for children
}) {
  const baseStyles =
    "pl-4 pr-4 py-2 m-2 font-bold border rounded-xl hover:shadow-2xl transition duration-200 ease-in-out cursor-pointer";
  const variantStyles =
    variant === "outline"
      ? "border-gray-400 text-black hover:text-white hover:bg-black"
      : variant === "link" 
        ? "border-none bg-transparent text-blue-600 hover:text-blue-800 hover:underline p-0 m-0"
        : "bg-black text-white hover:bg-white hover:text-black";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={!disabled ? onClick : null}
      className={`${baseStyles} ${variantStyles} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children || name}
    </button>
  );
}

export default Button;
