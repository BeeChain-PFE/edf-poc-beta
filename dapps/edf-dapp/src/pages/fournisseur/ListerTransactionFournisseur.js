import React, { useState } from "react";
import Stepper from "../../components/stepper/stepper";
const ListerTransactionFournisseur = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "T1 C=>F",
    "T2 F=>C ",
    "T3 F=>L",
    "T4  L=>F",
    "T5  L=>F",
    "T6 L=>C",
    "T7 F=>C",
  ];
  return (
    <>
      <h5 className="my-4">Process de traçabilité nucléaire</h5>

      <Stepper steps={steps} page="issuer" active={step + 1}></Stepper>
      <div>
        <p>Command</p>
      </div>
    </>
  );
};

export default ListerTransactionFournisseur;
