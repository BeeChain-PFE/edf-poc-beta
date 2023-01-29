import React, { useState, useEffect } from "react";
import Stepper from "../../components/stepper/stepper";
import ListerTransactions from "../../components/listerTransaction/listerTransactions";
import { processListContract } from "../../common/contracts/ProcessListContract";
import Select from "../../components/select/select";
import ValidationCard from "../../components/validation-card/validationCard";
import { Button } from "react-bootstrap";

const ListerTransactionsLabo = () => {
  useEffect(() => {
    getEtat();
    getListProcess();
  }, []);

  const getEtat = () => {
    processListContract.methods.getProcessState(1).call((err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result+1);
        setStep(result);
      }
    });
  };
  const getListProcess = () => {
    processListContract.methods
      .getOwnerProcesses("0xf17f52151EbEF6C7334FAD080c5704D77216b732")
      .call((err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result+1);
          setListProcess([]);
          result.forEach(({ id, state, hashes }) => {
            setListProcess((lp) => [...lp, "Le process " + id]);
            setStep(state);
          });
        }
      });
  };

  const getProcessById = (id) => {
    processListContract.methods.getProcessData(id).call((err, result) => {
      if (err) {
        console.log(err);
      } else {
        setTransactions(result[1]);
        setStep(result[2]);
        // setStep(result);
      }
    });
  };

  const [transactions, setTransactions] = useState([]);
  const [step, setStep] = useState(0);
  const [listProcess, setListProcess] = useState([]);
  const [idCurrentProccess, setIdCurrentProcess] = useState(1);
  const steps = [
    "T1 Initiated",
    "T2 Abandoned ",
    "T3 Validated",
    "T4  Testing",
    "T5  TestOK",
    "T6 TestKO",
    "T7 Sent",
    "T8 PVDGenerated",
  ];
  const handleOnchange = (e) => {
    const idProcess = parseInt(e.charAt(e.length - 1));
    setIdCurrentProcess(idProcess);
    getProcessById(idProcess);
  };
  const changeState = (newState) => {
    // console.log(parseInt(step) + newState);
    processListContract.methods
      .updateProcessState(idCurrentProccess, parseInt(step) + newState)
      .send({
        from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
      })
      .then((result) => {
        getEtat();
        // console.log(result);
        // setStep((step) => parseInt(step) + newState);
      });
  };
  return (
    <>
      <h5 className="my-4">Process de traçabilité nucléaire</h5>
      {listProcess.length > 0 && (
        <Select
          className="mb-2"
          label={"Liste de Process"}
          options={listProcess}
          onChange={handleOnchange}
        />
      )}

      <Stepper steps={steps} page="issuer" active={step}></Stepper>
      <ListerTransactions transactions={transactions} />

      {step === "1" && <ValidationCard changeState={changeState} />}
    </>
  );
};

export default ListerTransactionsLabo;
