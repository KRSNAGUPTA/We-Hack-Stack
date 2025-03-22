import React from "react";
//import PropTypes from "prop-types";

function Button({
  name = "button",
  onClick,
  type = "button",
  variant = "default",
  disabled = false,
}) {
  const baseStyles =
    "pl-4 pr-4 py-2 m-2 font-bold border rounded-xl hover:shadow-2xl hover:scale(125) transition duration-200 ease-in-out cursor-pointer";
  const variantStyles =
    variant === "outline"
      ? "border-gray-400 text-black hover:text-white hover:bg-black"
      : "bg-black text-white hover:bg-white hover:text-black";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={!disabled ? onClick : null}
      className={`${baseStyles} ${variantStyles} ${
        disabled ? disabledStyles : ""
      }`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {name}
    </button>
  );
}


export default Button;
