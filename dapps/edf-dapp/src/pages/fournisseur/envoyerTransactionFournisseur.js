import React from "react";
import Transaction from "../../components/transaction/transaction";

const EnvoyerTransactionFournisseur = () => {
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
      label: "returnReceipt",
      placeHolder: "yes",
    },
  ];
  return (
    <>
      <div>
        <Transaction
          transactionData={transactionData}
          title={"T2 - Fournisseur vers Client"}
          subtitle={
            "Accusé de réception du fournisseur pour valider ou non la prise en charge de la commande"
          }
        />
      </div>
      <hr />
      <div>
        <Transaction
          transactionData={transactionData}
          title={"T3 - Fournisseur vers Laboratoire"}
          subtitle={
            "Réalise les demandes de tests au laboratoire en spécifiant les matériaux utilisés également"
          }
        />
      </div>
    </>
  );
};

export default EnvoyerTransactionFournisseur;
