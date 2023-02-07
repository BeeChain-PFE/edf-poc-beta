import React, { useState, useEffect } from "react";

import "./account-dropdown.scss";
import Web3 from "web3";

const AccountDropDown = ({ isConnected, typeAccount }) => {
  const web3 = new Web3(Web3.givenProvider);

  const [publicKey, setpublicKey] = useState("");
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setpublicKey(accounts[0]);
    };
    getAccount();
    // this.unsubscribe && this.unsubscribe();
  }, []);

  return (
    <div className="account-dropdown d-flex  text-dark">
      {isConnected && <div className="px-2">{publicKey}</div>}
      {isConnected && (
        <div className="px-2">
          {typeAccount === "labo" ? "laboratoire" : typeAccount}
        </div>
      )}
    </div>
  );
};

export default AccountDropDown;
