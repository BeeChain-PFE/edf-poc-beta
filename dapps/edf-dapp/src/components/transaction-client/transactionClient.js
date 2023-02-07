import React, { useState, useEffect } from "react";
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
import { didRegistryContract } from "../../common/contracts/didRegistryContract";
import { useNavigate } from "react-router-dom";
import Loader from "../loading/loader";
const TransactionClient = ({ transactionData, title, subtitle }) => {
  const web3 = new Web3(Web3.givenProvider);
  const state = store.getState();
  const navigate = useNavigate();
  const [didFrom, setdidFrom] = useState("");
  const [suppliers, setsuppliers] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAllSuppliers = async () => {
    const suppliers = await didRegistryContract.methods
      .getAllSuppliers()
      .call();
    setsuppliers(suppliers);
    console.log(suppliers);
  };
  useEffect(() => {
    getAllSuppliers();
  }, []);
  const getDidFrom = async () => {
    await didRegistryContract.methods
      .getDataByAddress(state.publicKey)
      .call((err, result) => {
        if (err) {
          console.log(err);
        } else {
          setdidFrom(result[0]);
          // setStep(result);
        }
      });
    // console.log(didFrom);
  };

  getDidFrom();
  const transaction1 = {
    didFrom: didFrom,
    didTo: suppliers[index] && suppliers[index][1],
    dateTime: formatDate(new Date()),
    specifications: [{}],
  };

  const [specList, setSpecList] = useState([]);
  const [specQuantity, setSpecQuantity] = useState([0]);
  const [specItem, setSpecItem] = useState(["Turbine à gaz"]);
  const [specTest, setSpecTest] = useState([["Tests de flexion"]]);

  const setSpecifiationsTransactions1 = () => {
    const specTable = [];
    transaction1.specifications = {
      item: "Turbine à gaz",
      quantity: 0,
      test: "Tests de flexion",
    };
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
    console.log(state.publicKey);
    console.log(suppliers[index] ? suppliers[index][0] : "");
    setLoading(true);
    await web3.eth
      .sendTransaction({
        from: state.publicKey,
        to: suppliers[index] ? suppliers[index][0] : "",
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
            suppliers[index] ? suppliers[index][0] : ""
          )
          .send({
            from: state.publicKey,
          })
          .then((r) => {
            setLoading(false);
            processListContract.methods
              .getProcessCount()
              .call((err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(result);
                  navigate("/transactions-client-lister/" + result);
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
  if (loading)
    return <Loader title={"Transaction en cours vers fournisseur"} />;
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
                options={suppliers.map((supplier) => supplier[2])}
                onChange={(v, i) => setIndex(i)}
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
