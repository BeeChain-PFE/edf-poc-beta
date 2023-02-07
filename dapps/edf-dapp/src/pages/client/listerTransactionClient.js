import React, { useState, useEffect } from "react";
import Stepper from "../../components/stepper/stepper";
import { processListContract } from "../../common/contracts/ProcessListContract";
import Select from "../../components/select/select";
import { store } from "../../common/store";
import { ADD_KEY } from "../../common/reducers/types";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import jwt_decode from "jwt-decode";
import Loader from "../../components/loading/loader";
import { didRegistryContract } from "../../common/contracts/didRegistryContract";

const ListerTransactionsClient = () => {
  const { idProccess } = useParams();
  const state = store.getState();

  // console.log("idparam : " + idProccess);

  const [transactions, setTransactions] = useState([]);

  const [step, setStep] = useState(0);
  const [listProcess, setListProcess] = useState([]);
  const [idCurrentProccess, setIdCurrentProcess] = useState(
    idProccess
      ? idProccess
      : listProcess.length > 0
      ? listProcess[0].substr(listProcess[0].length - 1, listProcess[0].length)
      : 1
  );
  const [nameFournisseur, setnameFournisseur] = useState("");
  const [nameClient, setNameClient] = useState("");
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    getEtat();
    getListProcess();
    getProcessById(idCurrentProccess);
  }, [idCurrentProccess]);

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
      .getOwnerProcesses(state.publicKey)
      .call((err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log("get owners");
          // console.log(result);
          setListProcess([]);
          result.forEach(({ id, state, hashes }) => {
            setListProcess((lp) => [...lp, "Le process " + id]);
            setStep(state);
            setTransactions(hashes);
          });
        }
      });
  };

  const getProcessById = (id) => {
    setTransactions([]);
    console.log(id);
    console.log(id);
    processListContract.methods.getProcessData(id).call((err, result) => {
      if (err) {
        console.log(err);
      } else {
        // setTransactions((tx) => [result[1]]);
        console.log("trtttttttttt");
        console.log(result[1]);
        result[1].forEach((hash, index) => {
          setTransactionsData([]);
          web3.eth.getTransaction(hash).then(async (r) => {
            console.log("from :" + r.from);
            console.log("to :" + r.to);
            const nameClient = await didRegistryContract.methods
              .getDataByAddress(r.from)
              .call();
            console.log(nameClient);
            setNameClient(nameClient[2]);
            const nameFournisseur = await didRegistryContract.methods
              .getDataByAddress(r.to)
              .call();
            setnameFournisseur(nameFournisseur[2]);
            setTransactionsData((tr) => [r]);
          });
        });
        setStep(result[2]);
        // setStep(result);
      }
    });
  };

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
  const handleOnchange = (e) => {
    console.log("handleonChange");
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

  const web3 = new Web3(Web3.givenProvider);

  return (
    <>
      {listProcess.length > 0 ? (
        <div>
          <h1 className="my-4">
            Process n°{idCurrentProccess} de traçabilité nucléaire
          </h1>
          <Select
            className="mb-2"
            label={"Liste de Process"}
            options={listProcess}
            onChange={handleOnchange}
            currendId={idCurrentProccess}
          />
          <Stepper steps={steps} page="issuer" active={step}></Stepper>
          <div className="d-flex flex-row">
            {transactionsData.length > 0 &&
              transactionsData.map(
                ({ hash, from, to, input, blockNumber }, i) => (
                  <div key={i}>
                    <h4>{i == 0 ? "Données" : "Données"}</h4>
                    <p>
                      <b>Date de création :</b>{" "}
                      {jwt_decode(web3.utils.hexToString(input)).dateTime.split(
                        "T"
                      )[0] +
                        " " +
                        jwt_decode(
                          web3.utils.hexToString(input)
                        ).dateTime.split("T")[1]}
                    </p>

                    <div>
                      <p>
                        <b>{i === 0 ? "Client : " : "Fournisseur : "}</b>
                        {nameClient ? nameClient : from}
                        {" || "}
                        {jwt_decode(web3.utils.hexToString(input)).didFrom}
                      </p>
                      <p>
                        <b>{i === 0 ? "Fournisseur : " : "Laboratoire : "}</b>
                        {nameFournisseur ? nameFournisseur : to} {" || "}
                        {jwt_decode(web3.utils.hexToString(input)).didTo}
                      </p>
                    </div>

                    {i === 0 ? (
                      <p>
                        <b>Etat : </b>
                        {step !== "2" && step !== "8" && (
                          <span className="badge badge-success bg-primary">
                            En cours
                          </span>
                        )}

                        {step === "2" && (
                          <span className="badge badge-success bg-danger">
                            Echec
                          </span>
                        )}
                        {step === "8" && (
                          <span className="badge badge-success bg-success">
                            Succès
                          </span>
                        )}
                      </p>
                    ) : (
                      <br />
                    )}
                    <hr />

                    {jwt_decode(
                      web3.utils.hexToString(input)
                    ).specifications.map(
                      ({ item, size, poids, materials, quantity, test }) => (
                        <div>
                          <h4>Spécifications{" " + item}</h4>
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
          </div>
        </div>
      ) : (
        <div>
          <br />
          <h1> Aucun process en cours</h1>
        </div>
      )}
    </>
  );
};

export default ListerTransactionsClient;
