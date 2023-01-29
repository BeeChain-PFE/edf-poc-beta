import React, { useState, useEffect } from "react";
import Web3 from "web3";
import jwt_decode from "jwt-decode";
import { processListContract } from "../../common/contracts/ProcessListContract";
import { store } from "../../common/store";
const ListerTransactions = ({ transactions }) => {
  // const [transactions, setTransactions] = useState([]);
  const state = store.getState();
  const account = state.publicKey;

  const [transactionsData, setTransactionsData] = useState([]);
  const web3 = new Web3(Web3.givenProvider);
  //contrat

  useEffect(() => {
    listTransactions();
  }, [transactions]);

  const listTransactions = () => {
    transactions.forEach((hash) => {
      web3.eth.getTransaction(hash).then((r) => {
        console.log(r);
        setTransactionsData((tr) => [r]);
      });
    });
  };
  return (
    <>
      <h2>Lister mes transactions :</h2>

      {transactionsData.length > 0 &&
        transactionsData
          .filter(({ from, to, hash, blockNumber }, i) => {
            return (
              parseInt(account, 16) ===
                parseInt(JSON.stringify(from).replace(/"/g, ""), 16) ||
              parseInt(account, 16) ===
                parseInt(JSON.stringify(to).replace(/"/g, ""), 16)
            );
          })
          .map(({ hash, from, to, input, blockNumber }, i) => (
            <ul>
              <h3>Transactions du block {blockNumber} </h3>
              <li key={hash}> hash : {hash}</li>
              <li key={blockNumber}> blockNumber : {blockNumber}</li>
              <li key={from}> from : {from}</li>
              <li key={to}> to : {to}</li>
              <li key={web3.utils.hexToString(input)}>
                <pre>
                  {JSON.stringify(
                    jwt_decode(web3.utils.hexToString(input)),
                    null,
                    2
                  )}
                </pre>
              </li>
            </ul>
          ))}
      <hr />
    </>
  );
};

export default ListerTransactions;
