import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/back-button/backButton";
// import IssuerTable from "../../components/issuer-table/issuer-table";
import Pagetitle from "../../components/page-title/pageTitle";
import RevokeDialog from "../../components/revoke-dialog/revokeDialog";
import RevokeSuccessDialog from "../../components/revoke-success-dialog/revokeSuccessDialog";

const Issuer = () => {
  const [createDialogOpenned, setCreatedDialog] = useState(false);
  const [didCreated, setDidCreated] = useState(false);
  const onViewDidDialogClose = (data) => {
    setDidCreated(true);
    setCreatedDialog(false);
  };
  const onViewDidDocument = (data) => {
    setCreatedDialog(true);
  };
  const onDidCreatedSuccessClose = (data) => {
    setDidCreated(false);
    setCreatedDialog(false);
  };
  return (
    <div>
      <div className="d-flex p-3">
        <div className="me-4">
          <BackButton link="/did-management"></BackButton>
        </div>

        <Pagetitle title="Labo" subtitle="Verifiable Credentials"></Pagetitle>
      </div>

      <h4 className="mb-4">Creation and management of PVC issued by Labo</h4>

      <div className="d-flex mb-4">
        <p>
          In this tab you can create and sign (issue) PVC documents for a
          specific client (including yourself).
          <br />
          The issued document can be revoked and its data can be viewed.
        </p>
        <div className="spacer"></div>
        <div>
          <Link
            role="button"
            className="button primary w-auto px-3 text-nowrap"
            to="/create-did-document"
          >
            Create Issuer VC
          </Link>
        </div>
      </div>

      {/* <div>
        <IssuerTable onClick={onViewDidDocument}></IssuerTable>
      </div> */}
      {!!createDialogOpenned && (
        <RevokeDialog onClose={onViewDidDialogClose}></RevokeDialog>
      )}

      {!!didCreated && (
        <RevokeSuccessDialog
          onClose={onDidCreatedSuccessClose}
        ></RevokeSuccessDialog>
      )}
    </div>
  );
};

export default Issuer;
