import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/back-button/backButton";
import Button from "../../components/button/button";
import CategoriesBar from "../../components/categories-bar/categoriesBar";
import DidDocumentSuccess from "../../components/did-document-success/didDocumentSuccess";
import InputField from "../../components/input-field/InputField";
import Pagetitle from "../../components/page-title/pageTitle";
import ReceiverDidField from "../../components/reciever-did-field/receiveDidField";
import Stepper from "../../components/stepper/stepper";

const CreateDidDocument = () => {
  const [did, setDid] = useState(null);
  const [data, setData] = useState(null);
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [validDate, setValidDate] = useState(null);

  const steps = [
    "Choose reciever",
    "Choose document type",
    "Generate document",
    "Check document",
    "Sign a document",
  ];

  const categories = [
    {
      title: "Procès verbal Décentralisé",
      button: "Recomendations",
      value: "PVC",
    },
    {
      title: "Personal Data",
      button: "My contacts",
      value: "PersonalDataCredential",
    },
    { title: "Government", button: "Passport", value: "PassportCredential" },
    { title: "Finance", button: "Bank statement", value: "BankCredential" },
    { title: "E-health", button: "Covid passport", value: "EhealthCredential" },
    { title: "Education", button: "Diploma", value: "EducationCredential" },
    {
      title: "Professional achievements",
      button: "Recomendations",
      value: "ProfessionalCredential",
    },
  ];

  const onDidEnter = (did) => {
    console.log(did);
    setDid(did);
    setStep(did ? 1 : 0);
  };

  const onSelectTemplateButtonClick = () => {
    setStep(2);
  };

  const onSelectCategory = (value) => {
    setCategory(value);
    setStep(3);
  };

  const onFieldChange = (fieldName) => (value) => {
    setData((prevState) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [fieldName]: value || null,
        },
      };
    });
  };

  const onValidDateChange = (value) => {
    setValidDate(
      value ? dayjs(value, "MM/DD/YYYY").format("YYYY-MM-DD") : null
    );
  };

  const dataArr = [];
  Object.entries(data != null && data).forEach(([k, v]) =>
    dataArr.push({ [k]: v })
  );

  return (
    <div>
      <div className="d-flex pt-3 px-3">
        <div className="me-4">
          <BackButton link="/did-management"></BackButton>
        </div>

        <Pagetitle title="issuer" subtitle="Verifiable Credentials"></Pagetitle>
      </div>

      <h5 className="my-4">Create DID Document</h5>

      <Stepper steps={steps} page="issuer" active={step + 1}></Stepper>

      {step <= 1 && (
        <ReceiverDidField onDidEnter={onDidEnter}></ReceiverDidField>
      )}

      {step <= 1 && (
        <div className="d-flex mt-4">
          <Link to="/did-management">
            <Button color="second">Close</Button>
          </Link>
          {did && (
            <Button
              className="ms-3"
              color="primary"
              onClick={onSelectTemplateButtonClick}
            >
              Select template
            </Button>
          )}
        </div>
      )}

      {(step === 2 || step === 3) && (
        <>
          <div className="mt-4 w-50">
            <InputField
              label="Valid until (optional)"
              placeholder="MM/DD/YYYY"
              className="mb-2"
              inputChange={true}
              onChange={onValidDateChange}
            ></InputField>
          </div>
          <CategoriesBar
            categories={categories}
            onSelectCategory={onSelectCategory}
          ></CategoriesBar>
        </>
      )}

      {step === 3 && (
        <>
          <div className="mt-4 w-50">
            <InputField
              label="VC ID"
              placeholder="DID: ex: 1234567890abcdef"
              className="mb-2"
              inputChange={true}
              onChange={onFieldChange("vcid")}
            ></InputField>
            <InputField
              label="VC Description"
              placeholder="My contacts"
              className="mb-2"
              inputChange={true}
              onChange={onFieldChange("vcdescription")}
            ></InputField>
            {category === "PersonalDataCredential" && (
              <>
                <InputField
                  label="Phone 1"
                  placeholder="+38 (067) 123 45 67"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("phone1")}
                ></InputField>
                <InputField
                  label="Phone 2"
                  placeholder="+38 (067) 123 45 67"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("phone2")}
                ></InputField>
                <InputField
                  label="Telegram"
                  placeholder="@test_user"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("telegram")}
                ></InputField>
                <InputField
                  label="Viber"
                  placeholder="+38 (067) 123 45 67"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("viber")}
                ></InputField>
                <InputField
                  label="WhatsApp"
                  placeholder="+38 (067) 123 45 67"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("whatsapp")}
                ></InputField>
                <InputField
                  label="Linkedin"
                  placeholder="/userlink_1"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("linkedin")}
                ></InputField>
                <InputField
                  label="Email"
                  placeholder="my@mail.com"
                  inputChange={true}
                  onChange={onFieldChange("email")}
                ></InputField>
              </>
            )}
            {category === "PassportCredential" && (
              <>
                <InputField
                  label="Passport ID"
                  placeholder="TQJF07879871113"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("passport")}
                ></InputField>
                <InputField
                  label="Nationality"
                  placeholder="USA"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("nationality")}
                ></InputField>
                <InputField
                  label="Surname"
                  placeholder="Smith"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("surname")}
                ></InputField>
                <InputField
                  label="Given names"
                  placeholder="Ivan"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("givenName")}
                ></InputField>
                <InputField
                  label="Sex"
                  placeholder="M"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("sex")}
                ></InputField>
                <InputField
                  label="Date of birth"
                  placeholder="01 Jan 1970"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("birthDate")}
                ></InputField>
                <InputField
                  label="Place of birth"
                  placeholder="Zhmerinka, USA"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("birthPlace")}
                ></InputField>
                <InputField
                  label="Issued On"
                  placeholder="01 Jan 2013"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("issued")}
                ></InputField>
                <InputField
                  label="Expiered On"
                  placeholder="01 Jan 2023"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("expiered")}
                ></InputField>
                <InputField
                  label="Photo"
                  placeholder="https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("photo")}
                ></InputField>
              </>
            )}
            {category === "ProfessionalCredential" && (
              <>
                <InputField
                  label="Position"
                  placeholder="Sales Manager"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("position")}
                ></InputField>
                <InputField
                  label="Start of cooperation"
                  placeholder="11 May 2019"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("cooperationStartDate")}
                ></InputField>
                <InputField
                  label="End of cooperation"
                  placeholder="11 May 2020"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("cooperationEndDate")}
                ></InputField>
                <InputField
                  label="Additional description"
                  placeholder="Good boy!"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("additionalDescription")}
                ></InputField>
              </>
            )}
            {category === "EhealthCredential" && (
              <>
                <InputField
                  label="Covid Passport ID"
                  placeholder="HK871987981LKS"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("covidPassport")}
                ></InputField>
                <InputField
                  label="Date of vaccination"
                  placeholder="11 May 2021"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("vaccination")}
                ></InputField>
                <InputField
                  label="Number of stages"
                  placeholder="2"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("stages")}
                ></InputField>
                <InputField
                  label="Vaccine name"
                  placeholder="Moderna"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("vaccine")}
                ></InputField>
                <InputField
                  label="Manufacturer"
                  placeholder="Moderna, Inc"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("manufacturer")}
                ></InputField>
              </>
            )}
            {category === "BankCredential" && (
              <>
                <InputField
                  label="For (date)"
                  placeholder="1 Jan 2019"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("for")}
                ></InputField>
                <InputField
                  label="To (date)"
                  placeholder="31 Dec 2019"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("to")}
                ></InputField>
                <InputField
                  label="Opening balance"
                  placeholder="2146"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("balance")}
                ></InputField>
                <InputField
                  label="Withdrawals"
                  placeholder="6451"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("withdrawals")}
                ></InputField>
                <InputField
                  label="Deposits"
                  placeholder="3414"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("deposits")}
                ></InputField>
                <InputField
                  label="Closing balance to date"
                  placeholder="7871"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("closingBalance")}
                ></InputField>
                <InputField
                  label="Currency"
                  placeholder="USD"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("currency")}
                ></InputField>
              </>
            )}
            {category === "EducationCredential" && (
              <>
                <InputField
                  label="Diploma ID"
                  placeholder="СН 787187982"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("diplomid")}
                ></InputField>
                <InputField
                  label="Specialty"
                  placeholder="Applied math"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("speciality")}
                ></InputField>
                <InputField
                  label="Academic degree"
                  placeholder="Ph.D."
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("academicdegree")}
                ></InputField>
                <InputField
                  label="Date"
                  placeholder="11 May 2016"
                  className="mb-2"
                  inputChange={true}
                  onChange={onFieldChange("date")}
                ></InputField>
              </>
            )}
          </div>
          <div className="d-flex mt-4">
            <Link to="/did-management">
              <Button color="second">Close</Button>
            </Link>
            <Button
              className="ms-3"
              color="primary"
              //   onClick={onSignButtonClick}
            >
              Sign
            </Button>
          </div>
        </>
      )}

      {step === 4 && (
        <DidDocumentSuccess transaction={transactionId}></DidDocumentSuccess>
      )}
    </div>
  );
};

export default CreateDidDocument;
