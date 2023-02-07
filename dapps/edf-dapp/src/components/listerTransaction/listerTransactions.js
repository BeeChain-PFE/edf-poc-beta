import React, { useState, useEffect } from "react";
import Web3 from "web3";
import jwt_decode from "jwt-decode";
// import { processListContract } from "../../common/contracts/ProcessListContract";
import { store } from "../../common/store";
const ListerTransactions = ({
  transactions,
  setSpecifications,
  stateTransaction,
  type,
}) => {
  // const [transactions, setTransactions] = useState([]);
  const state = store.getState();
  const [transactionsData, setTransactionsData] = useState([]);
  const web3 = new Web3(Web3.givenProvider);
  //contrat
  console.log("aaaaa : " + stateTransaction);
  useEffect(() => {
    listTransactions();
  }, [transactions.length]);

  const listTransactions = () => {
    setTransactionsData([]);
    setSpecifications([]);
    console.log("taille : " + transactions.length);
    if (type === "fournisseur" && type === "client")
      transactions.forEach((hash, index) => {
        web3.eth.getTransaction(hash).then((r) => {
          setTransactionsData((tr) => [r]);
          setSpecifications((tr) => [
            ...tr,
            jwt_decode(web3.utils.hexToString(r.input)),
          ]);
        });
      });
    if (type === "labo")
      transactions.forEach((hash, index) => {
        web3.eth.getTransaction(hash).then((r) => {
          setTransactionsData((tr) => [...tr, r]);
          setSpecifications((tr) => [
            ...tr,
            jwt_decode(web3.utils.hexToString(r.input)),
          ]);
        });
      });
  };

  return (
    <>
      <div>
        {transactionsData.length > 0 && <h3>Détail </h3>}
        {transactionsData.length > 0 &&
          transactionsData.map(({ hash, from, to, input, blockNumber }, i) => (
            <div key={i}>
              <p>
                <b>Date de création :</b>{" "}
                {jwt_decode(web3.utils.hexToString(input)).dateTime.split(
                  "T"
                )[0] +
                  " " +
                  jwt_decode(web3.utils.hexToString(input)).dateTime.split(
                    "T"
                  )[1]}
              </p>
              {/* <p>Didfrom : {jwt_decode(web3.utils.hexToString(input)).didFrom}</p> */}
              {type === "fournisseur" && (
                <p>
                  <b>Client :</b>
                  {from} <b>||</b>{" "}
                  {jwt_decode(web3.utils.hexToString(input)).didFrom}
                </p>
              )}
              {type === "labo" && (
                <div>
                  <p>
                    <b>Client :</b>
                    {from} <b>||</b>{" "}
                    {jwt_decode(web3.utils.hexToString(input)).didFrom}
                  </p>
                  <p>
                    <b>Fournisseur :</b>
                    {to} <b>||</b>{" "}
                    {jwt_decode(web3.utils.hexToString(input)).didTo}
                  </p>
                </div>
              )}
              {type === "client" && (
                <p>
                  <b>Fournisseur :</b>
                  {to} <b>||</b>{" "}
                  {jwt_decode(web3.utils.hexToString(input)).didTo}
                </p>
              )}

              <p>
                <b>Etat : </b>
                {stateTransaction != "2" && stateTransaction != "8" && (
                  <span class="badge badge-success bg-primary">En cours</span>
                )}

                {stateTransaction == "2" && (
                  <span class="badge badge-success bg-danger">Echec</span>
                )}
                {stateTransaction == "8" && (
                  <span class="badge badge-success bg-success">Succès</span>
                )}
              </p>
              <hr />
              {/* <span class="badge badge-success bg-danger">Success</span>
            <span class="badge badge-success bg-primary">Success</span> */}
              {jwt_decode(web3.utils.hexToString(input)).specifications.map(
                ({ item, size, poids, materials, quantity, test }) => (
                  <div>
                    <h4>
                      Spécifications{" " + item}
                      {/* {materials ? "testé" : "commandés"} */}
                    </h4>
                    {size && (
                      <p>
                        <b>Taille :</b>
                        {size}
                      </p>
                    )}
                    {poids && (
                      <p>
                        <b>Poids :</b>
                        {poids}
                      </p>
                    )}
                    {quantity && (
                      <p>
                        <b>Quantité : </b>
                        {quantity}
                      </p>
                    )}
                    {test && <h5>Type de tests :</h5>}
                    {test && (
                      <table className="table">
                        <thead>
                          <tr></tr>
                        </thead>
                        <tbody>
                          {test.map((t, index) => (
                            // <p>
                            //   <b>test {index} : </b> {t}
                            // </p>
                            <tr key={index}>
                              <td>{t}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {materials && <h5>Liste des materials :</h5>}
                    {materials && (
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Nom du materials</th>
                          </tr>
                        </thead>
                        <tbody>
                          {materials.map((t, index) => (
                            // <p>
                            //   <b>test {index} : </b> {t}
                            // </p>
                            <tr key={index}>
                              <td>{t}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* <ul>
                    <h3>Transactions du block {blockNumber} </h3>
                    <li key={hash}> hash : {hash}</li>
                    <li key={blockNumber}> blockNumber : {blockNumber}</li>
                    <li key={from}> from : {from}</li>
                    <li key={to}> to : {to}</li>
                    <li key={web3.utils.hexToString(input)}>
                      <pre>
                        {JSON.stringify(
                          jwt_decode(web3.utils.hexToString(input))
                            .specifications,
                          null,
                          2
                        )}
                      </pre>
                    </li>
                  </ul> */}
                  </div>
                )
              )}
            </div>
          ))}
        <hr />
      </div>
    </>
  );
};

export default ListerTransactions;
