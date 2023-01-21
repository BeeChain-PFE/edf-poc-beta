import React, { useState } from "react";
import "./holder.scss";
import BackButton from "../../components/back-button/backButton";
import Pagetitle from "../../components/page-title/pageTitle";
import ButtonHolder from "../../components/button-holder/ButtonHolder";
import HolderTable from "../../components/holder-table/HolderTable";
import ViewDidDialog from "../../components/view-did-dialog/ViewDidDIalog";
import ViewDidReadDialog from "../../components/view-did-read-dialog/ViewDidReadDialog";

const Holder = () => {
  const [viewDialogOpenned, setViewDialogOpenned] = useState(false);
  const [viewReadDialogOpenned, setViewReadDialogOpenned] = useState(false);
  const [viewVcCredentialType, setViewVcCredentialType] = useState("");
  const onViewDidDialogClose = (data) => {
    setViewDialogOpenned(false);
  };
  const onViewDidDocument = () => {
    setViewDialogOpenned(true);
  };
  const onViewDidReadDocumentClose = () => {
    setViewVcCredentialType("");
  };
  const onViewDidReadDocument = () => {
    setViewReadDialogOpenned(true);
  };

  const onVcCategoryClick = (viewVcCredentialType) => {
    setViewVcCredentialType(viewVcCredentialType);
  };
  return (
    <div>
      <div className="d-flex p-3">
        <div className="me-4">
          <BackButton link="/did-management" color="pink"></BackButton>
        </div>

        <Pagetitle title="holder" subtitle="Verifiable Credentials"></Pagetitle>
      </div>

      <h4 className="mb-4">View and share VC issued to you</h4>

      <p>
        In this tab you can create and sign (issue) VC documents for a specific
        recipient (including yourself). The issued document can be revoked and
        its data can be viewed.
      </p>

      <div className="mb-4">
        <div className="button-row mb-4">
          <ButtonHolder
            className="personaldata"
            title="Personal Data"
            name="PersonalDataCredential"
            onClick={onVcCategoryClick}
          />
          <ButtonHolder
            className="government"
            title="Government Documents"
            name="PassportCredential"
            onClick={onVcCategoryClick}
          />
          <ButtonHolder
            className="finance"
            title="Finance"
            name="BankCredential"
            onClick={onVcCategoryClick}
          />
        </div>
        <div className="button-row">
          <ButtonHolder
            className="ehealth"
            title="E-Health"
            name="EhealthCredential"
            onClick={onVcCategoryClick}
          />
          <ButtonHolder
            className="education"
            title="Education"
            name="EducationCredential"
            onClick={onVcCategoryClick}
          />
          <ButtonHolder
            className="professional_achievments"
            title="Professional achievements"
            name="ProfessionalCredential"
            onClick={onVcCategoryClick}
          />
        </div>
      </div>

      <h4 className="mb-4">Incoming data requests</h4>

      <div>
        <HolderTable />
      </div>

      <div className="mb-4">
        <button
          className="button primary button-md"
          onClick={onViewDidDocument}
        >
          View DID checkbox
        </button>
        <button
          className="button primary button-md ms-2"
          onClick={onViewDidReadDocument}
        >
          View DID{" "}
        </button>
      </div>
      {!!viewDialogOpenned && (
        <ViewDidDialog
          vpRequest={null}
          onClose={onViewDidDialogClose}
        ></ViewDidDialog>
      )}
      {!!viewVcCredentialType && (
        <ViewDidReadDialog
          credentialType={viewVcCredentialType}
          onClose={onViewDidReadDocumentClose}
        />
      )}
    </div>
  );
};

export default Holder;
