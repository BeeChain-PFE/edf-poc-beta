import React from "react";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import PageTitle from "../page-title/pageTitle";
import "./transaction.scss";

const Transaction = ({ transactionData, title, subtitle }) => {
  return (
    <div className="transaction">
      <PageTitle title={title} subtitle={subtitle} />
      <div className="mt-4 w-50">
        {transactionData.map(({ label, placeHolder }, id) => (
          <InputField
            key={id}
            label={label}
            className="mb-2"
            inputChange={true}
            placeholder={placeHolder}
          />
        ))}
        <Button color="primary" className="mt-4" onClick={() => {}}>
          Envoyer Transaction
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
