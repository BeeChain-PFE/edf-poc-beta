import React from "react";
import "./label.scss";

const Label = ({ name, color }) => {
  return <div className={"app-label label-" + color}>{name}</div>;
};

export default Label;
