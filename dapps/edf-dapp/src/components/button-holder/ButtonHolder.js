import React from "react";
import "./button-holder.scss";

const ButtonHolder = ({ className, title, onClick, name }) => {
  const onClickButton = () => {
    if (onClick) {
      onClick(name);
    }
  };
  return (
    <button className="button-for-holder" onClick={onClickButton}>
      <div className={className}></div>
      <div className="title">{title}</div>
    </button>
  );
};

export default ButtonHolder;
