import React, { useState } from "react";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";
// import "../t";
import Web3 from "web3";
import { formatDate } from "../../common/helpers/formatDate";
import { processListContract } from "../../common/contracts/ProcessListContract";
import { store } from "../../common/store";
import SpecificationsFournisseur from "../specifications-fournisseur/specificationsFournisseur";
import { didRegistryContract } from "../../common/contracts/didRegistryContract";
const TransactionFournisseur = ({
  transactionData,
  title,
  subtitle,
  setStep,
  setLoading,
}) => {
  const web3 = new Web3(Web3.givenProvider);
  const state = store.getState();
  // console.log(state);
  const [didFrom, setdidFrom] = useState("");
  const [labos, setlabos] = useState([]);
  const [index, setIndex] = useState(0);
  const getAllLabos = async () => {
    const labs = await didRegistryContract.methods.getAllLaboratories().call();
    setlabos(labs);
  };
  getAllLabos();
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
  const transaction = {
    didFrom: didFrom,
    didTo: labos[index] && labos[index][1],
    dateTime: formatDate(new Date()),
    specifications: [{}],
  };

  const [specList, setSpecList] = useState([]);
  const [specPoids, setSpecPoids] = useState(["10 g"]);
  const [specSize, setSpecSize] = useState(["10 cm"]);
  const [specItem, setSpecItem] = useState(["Turbine à gaz"]);
  const [specMaterials, setSpecMaterials] = useState([["Acier inoxydable"]]);

  const setSpecifiationsTransactions1 = () => {
    const specTable = [];
    transaction.specifications = {
      item: "Turbine à gaz",
      quantity: 0,
      test: "Tests de flexion",
    };
    for (let index = 0; index < specList.length; index++) {
      specTable.push({
        item: specItem[index],
        size: specSize[index],
        poids: specPoids[index],
        materials: specMaterials[index],
      });
    }
    transaction.specifications = specTable;
    // console.log(transaction);
  };

  const envoyerTransaction = async () => {
    setSpecifiationsTransactions1();
    setLoading(true);
    // console.log(transaction);
    const sign = require("jwt-encode");
    const secret = "secret";
    const jwt = sign(transaction, secret);
    const state = store.getState();
    await web3.eth
      .sendTransaction({
        from: state.publicKey,
        to: labos[index] ? labos[index][0] : "",
        data: web3.utils.utf8ToHex(jwt),
      })
      .then(async (r) => {
        web3.eth.getTransaction(r.transactionHash).then((r) => console.log(r));
        // console.log(r.transactionHash);
        processListContract.methods
          .updateProcess(
            state.currentProcessId,
            4,
            r.transactionHash,
            labos[index] ? labos[index][0] : ""
          )
          .send({
            from: state.publicKey,
          })
          .then((r) => {
            setLoading(false);
            setStep(4);
            // console.log(r);
          });
      });
  };
  const onAddBtnClick = (event) => {
    setSpecList(
      specList.concat(
        <SpecificationsFournisseur
          key={specList.length}
          setSize={setSpecSize}
          setPoids={setSpecPoids}
          setItem={setSpecItem}
          setMaterials={setSpecMaterials}
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
                options={labos.map((labos) => labos[2])}
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

export default TransactionFournisseur;
