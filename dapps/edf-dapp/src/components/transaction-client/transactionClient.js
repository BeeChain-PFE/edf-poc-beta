import React, { useState } from "react";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";
import SpecificationsCient from "../specifications-client/specificationsClient";
import "./transaction.scss";
import Web3 from "web3";
import { formatDate } from "../../common/helpers/formatDate";
import { processListContract } from "../../common/contracts/ProcessListContract";
import { store } from "../../common/store";
const TransactionClient = ({ transactionData, title, subtitle, account }) => {
  const web3 = new Web3(Web3.givenProvider);

  const transaction1 = {
    didFrom: "did:ebsi:gerger",
    didTo: "did:ebsi:gerger",
    dateTime: formatDate(new Date()),
    specifications: [{}],
  };

  const [specList, setSpecList] = useState([]);
  const [specQuantity, setSpecQuantity] = useState([0]);
  const [specItem, setSpecItem] = useState(["item1"]);
  const [specTest, setSpecTest] = useState([["test1"]]);

  const setSpecifiationsTransactions1 = () => {
    const specTable = [];
    transaction1.specifications = { item: "item1", quantity: 0, test: "test1" };
    for (let index = 0; index < specList.length; index++) {
      specTable.push({
        item: specItem[index],
        quantity: specQuantity[index],
        test: specTest[index],
      });
    }
    transaction1.specifications = specTable;
    console.log(transaction1);
  };

  const envoyerTransaction = async () => {
    setSpecifiationsTransactions1();
    console.log(transaction1);
    const sign = require("jwt-encode");
    const secret = "secret";
    const jwt = sign(transaction1, secret);
    const state = store.getState();
    await web3.eth
      .sendTransaction({
        from: state.publicKey,
        to: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        value: "0",
        data: web3.utils.utf8ToHex(jwt),
      })
      .then(async (r) => {
        web3.eth.getTransaction(r.transactionHash).then((r) => console.log(r));
        console.log(r.transactionHash);
        await processListContract.methods
          .addProcess(
            r.transactionHash,
            state.publicKey,
            "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
          )
          .send({
            from: state.publicKey,
          })
          .then((r) => {
            processListContract.methods
              .getProcessCount()
              .call((err, result) => {
                if (err) {
                  console.log(err);
                } else {
                }
              });
          });
      });
  };
  const onAddBtnClick = (event) => {
    setSpecList(
      specList.concat(
        <SpecificationsCient
          key={specList.length}
          setQuantity={setSpecQuantity}
          setItem={setSpecItem}
          setTest={setSpecTest}
          index={specList.length + 1}
        />
      )
    );
  };
  return (
    <div className="transaction">
      <PageTitle title={title} subtitle={subtitle} />
      <div className="mt-4 w-50">
        {transactionData.map(
          ({ label, placeHolder, type, options, nom, nombrePieces }, id) => {
            if (type === "input")
              return (
                <InputField
                  key={id}
                  label={label}
                  className="mb-2"
                  inputChange={true}
                  placeholder={placeHolder}
                />
              );

            return (
              <Select
                key={id}
                className="mb-2"
                label={label}
                options={options}
              />
            );
          }
        )}
        {specList}
        <div className="d-flex flex-column w-50">
          <Button color="primary" className="mt-4" onClick={onAddBtnClick}>
            Add Spécification
          </Button>
          <Button color="primary" className="mt-4" onClick={envoyerTransaction}>
            Envoyer Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionClient;
