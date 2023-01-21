import React from "react";
import "./stepper.scss";

const stepper = ({ steps, active, page }) => {
  const len = steps.length;
  const renderStep = (step, currentIndex, active, isLast = false) => {
    const state = getStepStateClass(currentIndex, active, isLast);
    return (
      <div key={"step-wrapper-" + currentIndex} className="flex-fill">
        <div
          key={"step-block-" + currentIndex}
          className="d-flex align-items-center"
        >
          <div key={"step-" + currentIndex} className={"step " + state}></div>
          {!isLast && renderConnector(currentIndex, !!state)}
        </div>
        <div
          key={"step-name-" + currentIndex}
          className="step-name text-nowrap"
        >
          {step}
        </div>
      </div>
    );
  };

  const getStepStateClass = (currentIndex, active, isLast = false) => {
    let state = "";
    if (active === currentIndex) {
      state = "active-" + page;
    }
    if (active > currentIndex) {
      state = "completed-" + page;
    }

    if (isLast) {
      state += " last-" + page;
    }

    return state;
  };

  const renderConnector = (currentIndex, active = false) => {
    return (
      <div
        key={"connector-" + currentIndex}
        className={"connector " + (active ? "active-" + page : "")}
      ></div>
    );
  };
  return (
    <div className="d-flex align-items-center app-stepper">
      {steps.map((step, index) =>
        renderStep(step, index, active, len === index + 1)
      )}
    </div>
  );
};

export default stepper;
