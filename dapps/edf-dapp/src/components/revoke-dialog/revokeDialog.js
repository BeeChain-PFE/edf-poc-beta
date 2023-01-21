import * as React from "react";
import ReactModal from "react-modal";
import "./revoke-dialog.scss";
import Button from "../button/button";

const RevokeDialog = ({ onClose }) => {
  const onCancelButtonClick = () => {
    emitCloseEvent();
  };
  const onSubmitButtonClick = () => {
    emitCloseEvent();
  };
  const emitCloseEvent = (data) => {
    if (onClose) {
      onClose(data);
    }
  };

  return (
    <ReactModal
      className="revoke-dialog d-flex flex-column justify-content-between"
      isOpen={true}
    >
      <div>
        <h5 className="mb-3">Revoke DID Document</h5>
        <div className="mb-3">
          Are you really going to revoke the document? This may affect the
          recipient to whom it was issued.You cannot undo the revocation of a
          document.
        </div>
        <div>
          To complete the revocation, you will need to confirm and sign the
          transaction.
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button className="me-2" onClick={onCancelButtonClick}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSubmitButtonClick}>
          Revoke
        </Button>
      </div>
    </ReactModal>
  );
};

export default RevokeDialog;
