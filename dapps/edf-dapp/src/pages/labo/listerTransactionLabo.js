import React, { useState, useEffect } from "react";
import Stepper from "../../components/stepper/stepper";
import ListerTransactions from "../../components/listerTransaction/listerTransactions";
import { processListContract } from "../../common/contracts/ProcessListContract";
import Select from "../../components/select/select";
import { store } from "../../common/store";
import ValidationTest from "../../components/validation-test/validationTest";
import { ADD_KEY } from "../../common/reducers/types";
import TransactionLabo from "../../components/transaction-labo/transactionLabo";
import PageTitle from "../../components/page-title/pageTitle";
import Web3 from "web3";
import jwt_decode from "jwt-decode";
import Loader from "../../components/loading/loader";
import { didRegistryContract } from "../../common/contracts/didRegistryContract";
const ListerTransactionsLabo = () => {
  const state = store.getState();
  const [transactions, setTransactions] = useState([]);
  const [step, setStep] = useState(0);
  const [listProcess, setListProcess] = useState([]);
  const [idCurrentProccess, setIdCurrentProcess] = useState(0);
  const [specifications, setSpecifications] = useState([]);
  const [specificationsFournisseur, setSpecificationsFournisseur] = useState(
    []
  );
  const [client, setClient] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [loading, setLoading] = useState(false);
  const steps = [
    "T1 Initiated",
    "T2 Abandoned ",
    "T3 Validated",
    "T4  Testing",
    "T5  TestKO",
    "T6 TestOK",
    "T7 Sent",
    "T8 PVDGenerated",
  ];
  useEffect(() => {
    getEtat();
    getListProcess();
    if (listProcess.length > 0) {
      const idProcess = parseInt(
        listProcess[0].charAt(listProcess[0].length - 1)
      );
      console.log(idProcess);
      getProcessById(idProcess);
      store.dispatch({
        type: ADD_KEY,
        payload: {
          currentProcessId: idProcess,
        },
      });
    } else {
      console.log("null");
    }
  }, [listProcess.length, idCurrentProccess]);

  const getEtat = () => {
    processListContract.methods
      .getProcessState(idCurrentProccess)
      .call((err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result+1);
          setStep(result);
        }
      });
  };
  const getListProcess = () => {
    console.log(state.publicKey);
    processListContract.methods
      .getLaboratoryProcesses(state.publicKey)
      .call((err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          setListProcess([]);
          result.forEach(({ id, state, hashes }) => {
            setListProcess((lp) => [...lp, "Le process " + id]);
            setStep(state);
          });
        }
      });
  };

  const getProcessById = (id) => {
    processListContract.methods.getProcessData(id).call((err, result) => {
      if (err) {
        console.log(err);
      } else {
        setTransactions(result[1]);
        setStep(result[2]);
        setClient(result[3]);
        setFournisseur(result[5]);
      }
    });
  };

  const handleOnchange = (e) => {
    const idProcess = parseInt(e.charAt(e.length - 1));
    setIdCurrentProcess(idProcess);
    store.dispatch({
      type: ADD_KEY,
      payload: {
        currentProcessId: idProcess,
      },
    });
    getProcessById(idProcess);
  };

  const changeState = (newState) => {
    // console.log(parseInt(step) + newState);
    console.log("idProcess: " + idCurrentProccess);
    console.log(
      listProcess[0].substr(listProcess[0].length - 1, listProcess[0].length)
    );
    setLoading(true);
    processListContract.methods
      .updateProcessState(
        idCurrentProccess == 0
          ? listProcess[0].substr(
              listProcess[0].length - 1,
              listProcess[0].length
            )
          : idCurrentProccess,
        parseInt(step) + newState
      )
      .send({
        from: state.publicKey,
      })
      .then((result) => {
        getEtat();
        setStep((step) => parseInt(step) + newState);
        setLoading(false);
        // console.log(result);
      });
  };
  const [transactionsData, setTransactionsData] = useState([]);
  const web3 = new Web3(Web3.givenProvider);
  const [nameFournisseur, setnameFournisseur] = useState("");
  const [nameLabo, setNameLabo] = useState("");
  const [nameClient, setNameClient] = useState("");
  useEffect(() => {
    transactions.forEach((hash, index) => {
      setTransactionsData([]);
      web3.eth.getTransaction(hash).then(async (r) => {
        if (index == 1) {
          setSpecificationsFournisseur((tr) => [
            jwt_decode(web3.utils.hexToString(r.input)),
          ]);
        }
        if (index == 1) {
          const nameLabo = await didRegistryContract.methods
            .getDataByAddress(r.to)
            .call();
          console.log(nameLabo);
          setNameLabo(nameLabo[2]);
          const nameFournisseur = await didRegistryContract.methods
            .getDataByAddress(r.from)
            .call();
          setnameFournisseur(nameFournisseur[2]);
        } else {
          const nameClient = await didRegistryContract.methods
            .getDataByAddress(r.from)
            .call();
          console.log(nameLabo);
          setNameClient(nameClient[2]);
        }

        setTransactionsData((tr) => [...tr, r]);
        setSpecifications((tr) => [
          ...tr,
          jwt_decode(web3.utils.hexToString(r.input)),
        ]);
      });
    });
  }, [transactions]);

  console.log(transactionsData);
  return (
    <>
      {listProcess.length > 0 ? (
        <div>
          <h5 className="my-4">Process de traçabilité nucléaire</h5>

          <Select
            className="mb-2"
            label={"Liste de Process"}
            options={listProcess}
            onChange={handleOnchange}
          />
          <Stepper steps={steps} page="issuer" active={step}></Stepper>

          {loading ? (
            <Loader />
          ) : (
            <div className="d-flex flex-row">
              {transactionsData.length > 0 &&
                transactionsData.map(
                  ({ hash, from, to, input, blockNumber }, i) => (
                    <div key={i}>
                      <h3>
                        {i == 0 ? "Données Client" : "Données Fournisseur"}
                      </h3>
                      <p>
                        <b>Date de création :</b>{" "}
                        {jwt_decode(
                          web3.utils.hexToString(input)
                        ).dateTime.split("T")[0] +
                          " " +
                          jwt_decode(
                            web3.utils.hexToString(input)
                          ).dateTime.split("T")[1]}
                      </p>
                      {/* <p>Didfrom : {jwt_decode(web3.utils.hexToString(input)).didFrom}</p> */}

                      <div>
                        <p>
                          <b>{i === 0 ? "Client :" : "Fournisseur : "}</b>
                          {i == 0 ? nameClient : nameFournisseur}
                          {" || "} <br />
                          {jwt_decode(web3.utils.hexToString(input)).didFrom}
                        </p>
                        <p>
                          <b>{i === 0 ? "Fournisseur :" : "Laboratoire : "}</b>
                          {i == 0 ? nameFournisseur : nameLabo} {" || "}
                          {jwt_decode(web3.utils.hexToString(input)).didTo}
                        </p>
                      </div>

                      {i === 0 ? (
                        <p>
                          <b>Etat : </b>
                          {step != "2" && step != "8" && (
                            <span class="badge badge-success bg-primary">
                              En cours
                            </span>
                          )}

                          {step == "2" && (
                            <span class="badge badge-success bg-danger">
                              Echec
                            </span>
                          )}
                          {step == "8" && (
                            <span class="badge badge-success bg-success">
                              Succès
                            </span>
                          )}
                        </p>
                      ) : (
                        <br />
                      )}
                      <hr />
                      {/* <span class="badge badge-success bg-danger">Success</span>
            <span class="badge badge-success bg-primary">Success</span> */}
                      {jwt_decode(
                        web3.utils.hexToString(input)
                      ).specifications.map(
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
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
              {step === "4" && (
                <div className="w-50">
                  {" "}
                  <ValidationTest changeState={changeState} />
                </div>
              )}
            </div>
          )}
          {step === "7" && (
            <TransactionLabo
              title={"T4 - Laboratoire vers Client"}
              subtitle={"Réalise l’envoi du PVD sur le wallet du client"}
              specificationsClient={specifications[0]?.specifications}
              specificationsFournisseur={
                specificationsFournisseur[0]?.specifications
              }
              client={client}
              fournisseur={fournisseur}
              setStep={setStep}
            />
          )}
        </div>
      ) : (
        <div className="m-4">
          <PageTitle title={"Aucun process en cours"} />
        </div>
      )}
    </>
  );
};

export default ListerTransactionsLabo;
