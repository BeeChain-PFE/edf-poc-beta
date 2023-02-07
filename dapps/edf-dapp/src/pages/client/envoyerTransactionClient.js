import React, { useState, useEffect } from "react";

import TransactionClient from "../../components/transaction-client/transactionClient";

const EnvoyerTransactionClient = () => {
  const transactionData = [
    {
      label: "Fournisseur",
      placeHolder: "did:ebsi:XXX",
      type: "select",
    },
  ];

  return (
    <>
      <div>
        <TransactionClient
          transactionData={transactionData}
          title={"T1 - Client vers Fournisseur"}
          subtitle={
            "Réalise la commande des pièces en spécifiant les exigences associées"
          }
        />
      </div>
      <hr />
    </>
  );
};

export default EnvoyerTransactionClient;
