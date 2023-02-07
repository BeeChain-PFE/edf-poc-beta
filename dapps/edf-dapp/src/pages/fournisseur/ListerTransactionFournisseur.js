import React, { useState, useEffect } from "react";
import Stepper from "../../components/stepper/stepper";
import ListerTransactions from "../../components/listerTransaction/listerTransactions";
import { processListContract } from "../../common/contracts/ProcessListContract";
import Select from "../../components/select/select";
import ValidationCard from "../../components/validation-card/validationCard";
import { store } from "../../common/store";
import { ADD_KEY } from "../../common/reducers/types";
import Button from "../../components/button/button";
import { formatDate } from "../../common/helpers/formatDate";
import Web3 from "web3";
import { didRegistryContract } from "../../common/contracts/didRegistryContract";
import Loader from "../../components/loading/loader";
import { useNavigate, useParams } from "react-router-dom";
import EnvoyerTransactionFournisseur from "./envoyerTransactionFournisseur";
import jwt_decode from "jwt-decode";

const ListerTransactionsFournisseur = () => {
  const navigate = useNavigate();
  const web3 = new Web3(Web3.givenProvider);
  const state = store.getState();
  const { idProccess } = useParams();

  console.log("idparam : " + idProccess);

  const [transactions, setTransactions] = useState([]);

  const [step, setStep] = useState(0);
  const [listProcess, setListProcess] = useState([]);
  const [idCurrentProccess, setIdCurrentProcess] = useState(
    idProccess
      ? idProccess
      : listProcess.length > 0
      ? listProcess[0].substr(
          listProcess[0].length === 13
            ? listProcess[0].length - 2
            : listProcess[0].length - 1,
          listProcess[0].length
        )
      : 1
  );
  const [specifications, setSpecifications] = useState([]);
  const [client, setClient] = useState("");
  const [didFrom, setDidFrom] = useState("");
  const [didTo, setDidTo] = useState("");
  const [labo, setLabo] = useState("");
  const [dataTransaction, setDataTransactions] = useState([]);
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
    }
  }, [listProcess.length]);

  const transaction = {
    didFrom: didFrom,
    didTo: didTo,
    dateTime: formatDate(new Date()),
    listItems: [],
  };
  const getEtat = () => {
    processListContract.methods
      .getProcessState(idCurrentProccess)
      .call((err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result+1);
          console.log(result);
          setStep(result);
        }
      });
  };
  const getListProcess = () => {
    processListContract.methods
      .getSupplierProcesses(state.publicKey)
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
    processListContract.methods.getProcessData(id).call(async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        setTransactions(result[1]);
        setStep(parseInt(result[2]));
        setClient(result[3]);
        setLabo(result[4]);
        console.log(state.publicKey);
        const didFrom = await didRegistryContract.methods
          .getDataByAddress(state.publicKey)
          .call();
        const didTo = await didRegistryContract.methods
          .getDataByAddress(client)
          .call();
        setDidFrom(didFrom[0]);
        setDidTo(didTo[0]);
      }
    });
  };

  const changeState = (newState) => {
    // console.log(parseInt(step) + newState);
    console.log("ancier step : " + parseInt(step));
    console.log(newState);
    setLoading(true);
    processListContract.methods
      .updateProcessState(idCurrentProccess, parseInt(step) + newState)
      .send({
        from: state.publicKey,
      })
      .then((result) => {
        getEtat();

        setLoading(false);
        setStep((step) => parseInt(step) + newState);
        navigate("/transactions-fournisseur-lister/" + idCurrentProccess);
        // console.log(result);
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
  const envoyerPieces = async () => {
    transaction.listItems = specifications[0].specifications;
    console.log(transaction);
    const sign = require("jwt-encode");
    const secret = "secret";
    const jwt = sign(transaction, secret);
    await web3.eth
      .sendTransaction({
        from: state.publicKey,
        to: client,
        value: "0",
        data: web3.utils.utf8ToHex(jwt),
      })
      .then(async (r) => {
        await processListContract.methods
          .updateProcessState(idCurrentProccess, 7)
          .send({ from: state.publicKey })
          .then((r) => {
            console.log(r);
            getProcessById(idCurrentProccess);
          });
      });
  };
  const [nameFournisseur, setnameFournisseur] = useState("");
  const [nameLabo, setNameLabo] = useState("");
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    transactions.forEach((hash, index) => {
      setTransactionsData([]);
      web3.eth.getTransaction(hash).then(async (r) => {
        const nameLabo = await didRegistryContract.methods
          .getDataByAddress(r.to)
          .call();
        console.log(nameLabo);
        setNameLabo(nameLabo[2]);
        const nameFournisseur = await didRegistryContract.methods
          .getDataByAddress(r.from)
          .call();
        setnameFournisseur(nameFournisseur[2]);
        setTransactionsData((tr) => [...tr, r]);
        setSpecifications((tr) => [
          ...tr,
          jwt_decode(web3.utils.hexToString(r.input)),
        ]);
      });
    });
  }, [transactions]);
  return (
    <>
      <h1 className="my-4">
        Process n°
        {idCurrentProccess + " "}
        de traçabilité nucléaire
      </h1>

      {listProcess.length > 0 && (
        <Select
          className="mb-2"
          label={"Liste de Process"}
          options={listProcess}
          onChange={handleOnchange}
          currendId={idProccess}
        />
      )}

      <Stepper steps={steps} page="issuer" active={step}></Stepper>
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-row ">
          {(step === 3 || step === "3") && (
            <div className="w-100">
              <EnvoyerTransactionFournisseur
                setStep={setStep}
                setLoading={setLoading}
              />
            </div>
          )}
          <div className="w-100">
            <div className="w-100 mr-3 d-flex flex-row ">
              <div className="d-flex flex-row ">
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
                            {nameFournisseur}
                            {" || "}
                            {jwt_decode(web3.utils.hexToString(input)).didFrom}
                          </p>
                          <p>
                            <b>
                              {i === 0 ? "Fournisseur :" : "Laboratoire : "}
                            </b>
                            {nameLabo}
                            {" || "}
                            {jwt_decode(web3.utils.hexToString(input)).didTo}
                          </p>
                        </div>

                        {i === 0 ? (
                          <p>
                            <b>Etat : </b>
                            {step != "2" && step != "8" && (
                              <span className="badge badge-success bg-primary">
                                En cours
                              </span>
                            )}

                            {step == "2" && (
                              <span className="badge badge-success bg-danger">
                                Echec
                              </span>
                            )}
                            {step == "8" && (
                              <span className="badge badge-success bg-success">
                                Succès
                              </span>
                            )}
                          </p>
                        ) : (
                          <br />
                        )}
                        <hr />
                        {/* <span className="badge badge-success bg-danger">Success</span>
            <span className="badge badge-success bg-primary">Success</span> */}
                        {jwt_decode(
                          web3.utils.hexToString(input)
                        ).specifications.map(
                          ({
                            item,
                            size,
                            poids,
                            materials,
                            quantity,
                            test,
                          }) => (
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
              </div>
              {step === 1 && (
                <div className="w-50  d-flex justify-content-center align-items-center ">
                  <ValidationCard changeState={changeState} />
                </div>
              )}
            </div>
          </div>
          {step === 6 && (
            <Button color="primary" className="mt-2" onClick={envoyerPieces}>
              Envoyer Pièces
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default ListerTransactionsFournisseur;
