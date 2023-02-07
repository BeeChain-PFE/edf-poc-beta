import React, { useState } from "react";
import "./ledger-block.scss";
import ledger from "../../assets/images/ledger.png";
// import Web3 from "web3";
import { store } from "../../common/store";
import { ADD_KEY } from "../../common/reducers/types";
import { didRegistryContract } from "../../common/contracts/didRegistryContract";
import { useNavigate } from "react-router-dom";

import Web3 from "web3";

const LedgerBlock = ({ setisConnected }) => {
  const web3 = new Web3(Web3.givenProvider);
  // const storeState = store.getState();
  // const [account, setaccount] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(); // state variable to set account.
  const navigate = useNavigate();
  const connectToMetamask = () => {
    // history.push("/transactions-client-lister");
    if (window.ethereum) {
      // Demandez à l'utilisateur de se connecter à son portefeuille MetaMask
      window.ethereum
        .enable()
        .then(() => {
          setisConnected(true);
          // Si l'utilisateur accepte, récupérez une instance de l'objet Web3
          web3.eth.getAccounts().then(async (result) => {
            console.log(result);
            const dataAccount = await didRegistryContract.methods
              .getDataByAddress(result[0])
              .call();
            console.log(dataAccount[1]);
            store.dispatch({
              type: ADD_KEY,
              payload: {
                publicKey: result[0],
                isSignedIn: true,
                typeAccount: dataAccount[1],
              },
            });
            console.log(dataAccount[1]);
            if (dataAccount[1] === "client")
              navigate("/transactions-client-lister");
            if (dataAccount[1] === "fournisseur")
              navigate("/transactions-fournisseur-lister");
            if (dataAccount[1] === "labo")
              navigate("/transactions-labo-lister");
          });
        })
        .catch(() => {
          // Si l'utilisateur n'accepte pas ou si la connexion échoue, affichez un message d'erreur
          setisConnected(false);
          setError("La connexion à MetaMask a échoué");
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    } else {
      // Si MetaMask n'est pas disponible, affichez un message d'erreur
      setisConnected(false);
      setError("MetaMask n'est pas disponible");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  // if (isConnected) redirect("/transactions-client-lister");
  return (
    <div className="ledger-block mb-4 row align-items-center">
      <div className="col-12 col-md-auto text-center">
        <img className="ledger-img" src={ledger} alt="Ledger" />
      </div>

      <div className="col-12 col-md w-100">
        <h4>Blockchain</h4>
        <p>Connectez vous à notre application via votre wallet</p>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="button button-lg primary w-100"
          onClick={connectToMetamask}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default LedgerBlock;
