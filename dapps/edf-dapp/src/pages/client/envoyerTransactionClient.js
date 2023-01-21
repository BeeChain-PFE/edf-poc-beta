import React from "react";
import Transaction from "../../components/transaction/transaction";

const EnvoyerTransactionClient = () => {
  const transactionData = [
    {
      label: "didTo",
      placeHolder: "did:ebsi:XXX",
    },
    {
      label: "dateTime",
      placeHolder: "YYYY-MM-DDThh:mm:ss",
    },
    {
      label: "item",
      placeHolder: "yes",
    },
    {
      label: "quantity",
      placeHolder: "55",
    },
    {
      label: "tests",
      placeHolder: "resists XX pressure",
    },
  ];
  return (
    <>
      <div>
        <Transaction
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
