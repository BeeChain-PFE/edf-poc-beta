import React, { useState } from "react";
import "./ledger-block.scss";
import ledger from "../../assets/images/ledger.png";
// import Web3 from "web3";
import { store } from "../../common/store";
import { ADD_KEY } from "../../common/reducers/types";

const LedgerBlock = () => {
  // const web3 = new Web3(Web3.givenProvider);
  // const storeState = store.getState();
  // const [account, setaccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(); // state variable to set account.
  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(result);
          store.dispatch({
            type: ADD_KEY,
            payload: {
              publicKey: result[0],
              isSignedIn: true,
              typeAccount: "fournisseur",
            },
          });
          console.log("ledger block");
          console.log(store.getState());
          // setConnectBtn("Wallet connecté");
          //   web3.eth
          //     .getTransactionCount(result[0])
          //     .then((r) => setNbTransactions(r));
        });
      // .then(() => console.log(storeState.signin));
    } else {
      console.log("install");
      setErrorMessage("Need to install Metamask!");
    }
  };
  return (
    <div className="ledger-block mb-4 row align-items-center">
      <div className="col-12 col-md-auto text-center">
        <img className="ledger-img" src={ledger} alt="Ledger" />
      </div>

      <div className="col-12 col-md w-100">
        <h4>Ledger</h4>
        <p>Connect and sign in with your Ledger wallet </p>
      </div>

      <div className="col-12 col-md-auto p-0">
        <button
          className="button button-lg primary w-100"
          onClick={connectWalletHandler}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default LedgerBlock;
