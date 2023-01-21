import React from "react";
import "./pill-tab.scss";
import { ReactComponent as ArrowRight } from "../../assets/images/arrow-right.svg";
import { Link } from "react-router-dom";

const PillTab = ({ title, description, color, link }) => {
  return (
    <div className="pill-tab d-flex p-3">
      <div>
        <h4 className="pill-tab-title">{title}</h4>
        <p className="pill-tab-description">{description}</p>
      </div>
      <div>
        <Link to={link} className={"pill-tab-link link-color-" + color}>
          <ArrowRight></ArrowRight>
        </Link>
      </div>
    </div>
  );
};

export default PillTab;
