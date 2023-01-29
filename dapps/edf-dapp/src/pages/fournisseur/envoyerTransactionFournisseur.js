import React from "react";
import TransactionFournisseur from "../../components/transaction-fournisseur/transactionFournisseur";

const EnvoyerTransactionFournisseur = () => {
  const transactionData = [
    {
      label: "Laboratoires",
      placeHolder: "did:ebsi:XXX",
      type: "select",
      options: ["Labo1", "Labo2"],
    },
  ];
  return (
    <>
      <div>
        <TransactionFournisseur
          transactionData={transactionData}
          title={"T2 - Fournisseur vers Client"}
          subtitle={
            "Accusé de réception du fournisseur pour valider ou non la prise en charge de la commande"
          }
        />
      </div>
    </>
  );
};

export default EnvoyerTransactionFournisseur;
