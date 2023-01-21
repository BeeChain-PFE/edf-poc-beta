import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/images/arrow-left.svg";

const BackButton = ({ color, link }) => {
  return (
    <Link
      role="button"
      className={
        "button primary button-icon static " + (color ? "color-" + color : "")
      }
      to={link}
    >
      <ArrowLeft></ArrowLeft>
    </Link>
  );
};

export default BackButton;
