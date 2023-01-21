import * as React from "react";
import "./page-title.scss";

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="d-flex flex-column page-title">
      <h4>{title}</h4>
      {!!subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
