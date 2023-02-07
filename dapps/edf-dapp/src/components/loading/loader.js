import React from "react";
import "./loader.scss";

export default function Loader({ title }) {
  return (
    <>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
      <h2 className="d-flex justify-content-center">{title}</h2>
    </>
  );
}
