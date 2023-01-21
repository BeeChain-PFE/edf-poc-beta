import React from "react";
import ReactModal from "react-modal";
import Button from "../button/button";
import "./did-created-success-dialog.scss";

const DidCreatedSuccessDialog = ({ onClose }) => {
  const onCloseButtonClick = () => {
    emitCloseEvent();
  };

  const emitCloseEvent = (data) => {
    if (onClose) {
      onClose(data);
    }
  };
  return (
    <ReactModal
      className="did-created-success-dialog d-flex flex-column justify-content-center align-items-center"
      isOpen={true}
    >
      <h5>DID Successfully created</h5>

      <div>
        <p className="mb-1 fw-bold text-center">TransactionID:</p>
        <p className="m-0 text-center">1jh2k45g12346hfjhfjljg135jgk235khgjh5</p>
      </div>

      <Button color="primary" className="mt-4" onClick={onCloseButtonClick}>
        OK
      </Button>
    </ReactModal>
  );
};

export default DidCreatedSuccessDialog;
