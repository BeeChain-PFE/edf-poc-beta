import React from "react";
import Transaction from "../../components/transaction/transaction";

const EnvoyerTransactionFournisseur = () => {
  const transactionData = [
    {
      label: "Client",
      placeHolder: "did:ebsi:XXX",
      type: "select",
      options: ["Client1", "Client2"],
    },
    {
      label: "returnReceipt",
      type: "select",
      options: ["yes", "no"],
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
