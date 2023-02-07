import React from "react";
import TransactionFournisseur from "../../components/transaction-fournisseur/transactionFournisseur";

const EnvoyerTransactionFournisseur = ({ setStep, setLoading }) => {
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
          setLoading={setLoading}
          setStep={setStep}
          transactionData={transactionData}
          title={"T4 - Fournisseur vers Labo"}
          subtitle={
            "Réalise les demandes de tests au laboratoire en spécifiant les matériaux utilisés également"
          }
        />
      </div>
    </>
  );
};

export default EnvoyerTransactionFournisseur;
