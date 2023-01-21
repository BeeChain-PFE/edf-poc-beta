import React, { useState } from "react";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";
import Specifications from "../specifications/specifications";
import "./transaction.scss";
import Web3 from "web3";
import { formatDate } from "../../common/helpers/formatDate";

const Transaction = ({ transactionData, title, subtitle }) => {
  const transaction1 = {
    didFrom: "did:ebsi:gerger",
    didTo: "did:ebsi:gerger",
    dateTime: formatDate(new Date()),
    specifications: [{}],
  };
  const [specList, setSpecList] = useState([]);
  const [specQuantity, setSpecQuantity] = useState([]);
  const [specItem, setSpecItem] = useState([]);
  const [specTest, setSpecTest] = useState([]);

  const web3 = new Web3(Web3.givenProvider);
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
    const today = new Date();
    console.log(transaction1);
    const sign = require("jwt-encode");
    const secret = "secret";
    const jwt = sign(transaction1, secret);
    let transactionHash = await web3.eth
      .sendTransaction({
        from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
        to: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        value: "0",
        data: web3.utils.utf8ToHex(jwt),
      })
      .then((r) =>
        web3.eth.getTransaction(r.transactionHash).then((r) => console.log(r))
      );
  };
  const onAddBtnClick = (event) => {
    setSpecList(
      specList.concat(
        <Specifications
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
            else if (type === "select") {
              return (
                <Select
                  key={id}
                  className="mb-2"
                  label={label}
                  options={options}
                />
              );
            }
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

export default Transaction;
