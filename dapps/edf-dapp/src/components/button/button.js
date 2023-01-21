import React from "react";

const Button = ({ className, color, size, disabled, onClick, children }) => {
  const getColorClass = () => {
    return color ? ` ${color}` : "";
  };
  const getSizeClass = () => {
    return ` button-${size || "md"}`;
  };

  return (
    <button
      className={"button" + getColorClass() + getSizeClass() + ` ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
