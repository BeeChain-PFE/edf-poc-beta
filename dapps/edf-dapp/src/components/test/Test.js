import React, { useEffect } from "react";
import { useState } from "react";
import Web3 from "web3";
import jwt_decode from "jwt-decode";
// import SimpleStorageContract from '../../abi/SimpleStorage.json';
import Tracabilite from "../../abi/Tracabilite.json";

const Test = () => {
  const [errorMessage, setErrorMessage] = useState(); // state variable to set account.
  const [account, setAccount] = useState(""); // state variable to set account.
  const [connectBtn, setConnectBtn] = useState("CONNECT TO WALLET"); // state variable to set account.
  const [nbTransactions, setNbTransactions] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transactionsData, setTransactionData] = useState({});
  const [transactionsFournisseurClient, setTransactionsFournisseurClient] =
    useState([]);
  const NETWORK = "2018";
  // const CONTRACT_ABI =SimpleStorageContract.abi;
  // const CONTRACT_ADDRESS = SimpleStorageContract.networks[NETWORK].address;
  const CONTRACT_ABI_TRACABILITE = Tracabilite.abi;
  const CONTRACT_ADDRESS_TRACABILITE = Tracabilite.networks[NETWORK].address;
  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangerHandler(result[0]);
          setConnectBtn("Wallet connecté");
          web3.eth
            .getTransactionCount(result[0])
            .then((r) => setNbTransactions(r));
        });
    } else {
      setErrorMessage("Need to install Metamask!");
    }
  };
  const accountChangerHandler = (newAccount) => {
    setAccount(newAccount);
  };

  const web3 = new Web3(Web3.givenProvider);
  // Contract address of the deployed smart contract

  // const storageContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const tracabilite = new web3.eth.Contract(
    CONTRACT_ABI_TRACABILITE,
    CONTRACT_ADDRESS_TRACABILITE
  );

  // Hold variables that will interact with our contract and frontend
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");

  // const numberSet = async (t) => {
  //   t.preventDefault();
  //   // Get permission to access user funds to pay for gas fees
  //   const gas = await storageContract.methods.set(number).estimateGas();
  //   const post = await storageContract.methods.set(number).send({
  //     from: account,
  //     gas,
  //   }).then(r=>console.log("ok")).then(r=>console.log(r));
  //   web3.eth.getTransactionCount(account).then(r=>setNbTransactions(r))
  // };

  // const numberGet = async (t) => {
  //   t.preventDefault();
  //   const post = await storageContract.methods.get().call();
  //   setGet(post);
  // };

  const setTransaction1 = async (t) => {
    t.preventDefault();
    // Get permission to access user funds to pay for gas fees
    //  await tracabilite.methods.seTtransactionFournisseurClient("did:ebsi:from","did:ebsi:to","2023-01-01",false).send({
    //   from: account,
    //   to:"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
    // }).then(r=>console.log("transaction 1")).then(r=>console.log(r));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    let transactionHash = await web3.eth
      .sendTransaction({
        from: account,
        to: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        value: "0",
        data: web3.utils.utf8ToHex(textAreaValue),
      })
      .then((r) =>
        web3.eth
          .getTransaction(r.transactionHash)
          .then((r) => setTransactionData(r))
      );
    // let transaction = await web3.eth.getTransaction(transactionHash.blockHash).then(r=>console.log("result 1 :")).then(r=>console.log(r.data))
    //  let data = JSON.parse(web3.utils.hexToUtf8(transaction.data))
    console.log("data");

    // console.log(data) // should log 1
    // web3.eth.getTransactionCount(account).then(r=>setNbTransactions(r))
  };

  const getTransaction1 = async (t) => {
    t.preventDefault();
    tracabilite.methods
      .geTtransactionFournisseurClient()
      .call((err, result) => {
        if (err) {
          console.log(err);
        } else {
          setTransactionsFournisseurClient(result[0]);
        }
      });
  };
  const listTransactions = async () => {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(`Le dernier bloc de la chaîne est le #${blockNumber}`);

    for (let i = 0; i < blockNumber; i++) {
      const block = await web3.eth.getBlock(i, true);
      web3.eth.getBlockTransactionCount(block.hash);
      if (block.transactions.length === 0) {
        continue;
      } else {
        web3.eth
          .getTransaction(block.transactions[0].hash)
          .then((r) => setTransactions((tr) => [...tr, r]));
      }
      console.log(`Bloc #${i} :`);
    }
  };

  const comparerTransaction = (b1, b2) => {
    return b1.blockNumber === b2.blockNumber;
  };

  // web3.eth
  //           .getTransaction(r.transactions[0].hash)
  //           .then(console.log)
  //           // .then((r) => setTransactions((tr) => [...tr, r]))
  //           .then((r) => console.log(transactions))
  const getTransactions = () => {
    web3.eth.getTransactionCount(account).then((b = console.log) => {
      console.log(b);
      for (var i = 0; i < b; i++) {
        web3.eth.getBlock(b - i, true).then((Block) => {
          console.log(Block);
          const a = [Block.hash];
          let iterator = a.values();
          for (let elements of iterator) {
            web3.eth.getBlock(elements).then((r) =>
              web3.eth
                .getTransaction(r.hash)
                .then(console.log)
                .then((r) => {
                  if (transactions.includes(r))
                    setTransactions((tr) => [...tr, r]);
                })
                .then((r) => console.log(transactions))
            );
            // .then((e) => setTransactions((tr) => [...tr, e]));
          }
        });
      }
    });
  };
  const [textAreaValue, setTextAreaValue] = useState("");
  const handleTextArea = (event) => {
    setTextAreaValue(event.target.value);
  };
  // useEffect(() => {
  //   if (account !== "") listTransactions();
  // }, [account]);
  return (
    <>
      {/* <NavBar account={account}/> */}
      <div>
        <h3>{"Se connecter"}</h3>
        <hr />
        <button onClick={connectWalletHandler}>{connectBtn}</button>
        <p>Addresse : {account}</p>
        {errorMessage}
      </div>
      <h3> Lister transaction </h3>
      {`Nombre de transactions : ${nbTransactions}`}

      <button onClick={listTransactions}>Listes transaction</button>
      <hr />
      <h3> Envoyer transaction</h3>
      <div className="main">
        <div className="card">
          <form className="form" onSubmit={setTransaction1}>
            <label>
              Data à envoyer:
              {/* <input
                className="input"
                type="text"
                name="name"
                onChange={(t) => setUint(t.target.value)}
              /> */}
              <textarea
                rows="5"
                cols="80"
                id="TITLE"
                value={textAreaValue}
                onChange={handleTextArea}
              ></textarea>
            </label>
            <button className="button" type="submit" value="Confirm">
              Confirmer
            </button>
          </form>
          <br />
          <button className="button" onClick={getTransaction1} type="button">
            Afficher la valeur
          </button>
          {getNumber}
        </div>
      </div>
      <hr />
      {/* <Login/>
       */}
      <h2>Dernière Transaction :</h2>
      {/* {transactionsFournisseurClient.map((value,i)=>{
        console.log(value);
        return <p key={i}>  {value}</p>;
       }
         
       )} */}
      {Object.entries(transactionsData).map(([key, val], i) => {
        return (
          (key === "from" ||
            key === "to" ||
            key === "input" ||
            key === "hash") && (
            <p key={i}>
              {" "}
              {key} : {val}
            </p>
          )
        );
      })}
      <hr />
      <h2>Lister mes transactions :</h2>

      {transactions
        .filter(({ from, to, hash, blockNumber }, i) => {
          // console.log(
          //   "Transaction : " +
          //     hash +
          //     " from :" +
          //     from.toUpperCase() +
          //     " to :" +
          //     (to === null ? "null" : to.toUpperCase()) +
          //     " account : " +
          //     account.toUpperCase()
          // );
          console.log(
            account.toUpperCase() === from.toUpperCase() ||
              (to === null ? false : account.toUpperCase() === to.toUpperCase())
              ? blockNumber
              : "faux"
          );
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
      <h2>Lister toutes les transactions :</h2>

      {transactions
        .filter(
          (r) => (item, index, array) =>
            array.findIndex((otherItem) =>
              comparerTransaction(item, otherItem)
            ) === index
        )
        .map(({ hash, from, to, input, blockNumber }, i) => (
          <ul key={i}>
            <h3>Transactions du block {blockNumber} </h3>
            <li> hash : {hash}</li>
            <li> blockNumber : {blockNumber}</li>
            <li> from : {from}</li>
            <li> to : {to}</li>
            <li> data en hex : {input}</li>
          </ul>
        ))}
      <hr />

      {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
    </>
  );
};

export default Test;
