import React, { useState } from "react";
import Button from "../button/button";
import "./reciever-did-field.scss";

const ReceiveDidField = ({ onDidEnter }) => {
  const [did, setDid] = useState(null);
  const [valid, setValid] = useState(true);

  const onInputChange = (event) => {
    setDid(event.target.value);
    setValid(false);
    if (onDidEnter) {
      onDidEnter(null);
    }
  };
  const checkDid = async () => {
    const result = true; // this.state.did ? await veramoManager.resolveDid(this.state.did) : null;
    const valid = !!result;
    console.log(did);
    console.log("onDidEnter " + onDidEnter);
    console.log("if :" + (valid && onDidEnter));
    setValid(valid);
    if (valid) {
      onDidEnter(did);
    }
  };
  return (
    <div className="reciever-did-field">
      <label className="form-label">Enter reciever’s DID</label>

      <div className="d-flex">
        <input className="form-control me-2" onChange={onInputChange} />

        <Button color="second" disabled={!did} onClick={checkDid}>
          Check
        </Button>
      </div>
      {!valid && <div className="did-not-checked mt-2">DID is no checked</div>}

      {valid && <div className="did-valid mt-2">DID is Valid</div>}
    </div>
  );
};

export default ReceiveDidField;
