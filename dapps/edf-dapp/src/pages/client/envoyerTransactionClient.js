import React from "react";
import Specifications from "../../components/specifications/specifications";
import Transaction from "../../components/transaction/transaction";

const EnvoyerTransactionClient = () => {
  const transactionData = [
    {
      label: "Fournisseur",
      placeHolder: "did:ebsi:XXX",
      type: "select",
      options: ["fournisseur1", "fournisseur2"],
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
