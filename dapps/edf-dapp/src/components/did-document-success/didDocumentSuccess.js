import React from "react";
import "./did-document-success.scss";
import { ReactComponent as Check } from "../../assets/images/check.svg";

const DidDocumentSuccess = ({ transaction }) => {
  return (
    <div className="d-flex did-document-success">
      <div className="check">
        <Check></Check>
      </div>
      <div className="message-block ms-3">
        <h5>The document has been published successfully!</h5>
        <p className="transaction-id-label">TransactionID:</p>
        <p className="transaction-id">{transaction}</p>
      </div>
    </div>
  );
};

export default DidDocumentSuccess;
