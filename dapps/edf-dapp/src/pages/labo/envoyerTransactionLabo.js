import React from "react";
import TransactionLabo from "../../components/transaction-labo/transactionLabo";

const EnvoyerTransactionLabo = () => {
  return (
    <>
      <div>
        <TransactionLabo
          title={"T4 - Laboratoire vers Client"}
          subtitle={"Réalise l’envoi du PVD sur le wallet du client"}
        />
      </div>
      <hr />
    </>
  );
};

export default EnvoyerTransactionLabo;
