import React, { useState, useEffect } from "react";
import Button from "../button/button";
import PageTitle from "../page-title/pageTitle";
import Web3 from "web3";
import { formatDate } from "../../common/helpers/formatDate";
import { processListContract } from "../../common/contracts/ProcessListContract";
import { store } from "../../common/store";
import Api from "../../api/configuration.json";
import { didRegistryContract } from "../../common/contracts/didRegistryContract";
const TransactionLabo = ({
  title,
  setStep,
  specificationsClient,
  specificationsFournisseur,
  fournisseur,
  client,
}) => {
  const state = store.getState();
  const web3 = new Web3(Web3.givenProvider);
  const [idPvd, setIdPvd] = useState("PVD2");
  const [didLabo, setDidLabo] = useState("");
  const [didFournisseur, setDidFournisseur] = useState("");
  const [didClient, setDidClient] = useState("");
  const transaction1 = {
    didFrom: "did:ebsi:gerger",
    didTo: "did:ebsi:gerger",
    dateTime: formatDate(new Date()),
    idPvd: idPvd,
  };

  useEffect(() => {
    fetch(Api.WALTID_HOLDER_API + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "holder@edf.fr", password: "holder" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Save the token to local storage
        console.log("login");
        localStorage.setItem("token", data.token);
        console.log(data.token);
      });
  }, []);

  const getDid = async (address) => {
    const dataAddress = await didRegistryContract.methods
      .getDataByAddress(address)
      .call();
    console.log(dataAddress);
    if (dataAddress[1] === "fournisseur") setDidFournisseur(dataAddress[0]);
    if (dataAddress[1] === "client") setDidClient(dataAddress[0]);
    if (dataAddress[1] === "labo") setDidLabo(dataAddress[0]);
  };
  const storeCredential = (vc) => {
    console.log(vc);
    const token = localStorage.getItem("token");

    let queryString = `/api/wallet/credentials/${idPvd}`;
    console.log(token);
    return fetch(Api.WALTID_HOLDER_API + queryString, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vc),
    })
      .then((res) => res.json())
      .then((vc) => console.log(vc))
      .catch((error) => console.error(error));
  };

  const issuePvd = () => {
    getDid(client);
    getDid(fournisseur);
    getDid(state.publicKey);
    const stakeHolders = [
      {
        did: didClient,
        role: "final client",
      },
      {
        did: didFournisseur,
        role: "supplier",
      },
      {
        did: didLabo,
        role: "laboratory",
      },
    ];
    const pvd = {
      id: idPvd,
      issuer: didLabo,
      dateTime: formatDate(new Date()),
      stakeHolders: stakeHolders,
      specificationsClient: specificationsClient,
      specificationsFournisseur: specificationsFournisseur,
    };
    const bodyPvd = {
      templateId: "PVD",
      config: {
        issuerDid: didLabo,
        subjectDid: didClient,
      },
      credentialData: pvd,
    };
    fetch(Api.WALTID_ISSUER_API + "/v1/credentials/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPvd), // data est l'objet JSON que vous voulez envoyer
    })
      .then((res) => res.json())
      .then((vc) => storeCredential(vc))

      .catch((error) => console.error(error));
  };

  const envoyerTransaction = async () => {
    issuePvd();
    // issuePvd();
    const sign = require("jwt-encode");
    const secret = "secret";
    const jwt = sign(transaction1, secret);
    const state = store.getState();
    await web3.eth
      .sendTransaction({
        from: state.publicKey,
        to: client,
        value: "0",
        data: web3.utils.utf8ToHex(jwt),
      })
      .then(async (r) => {
        web3.eth.getTransaction(r.transactionHash).then((r) => console.log(r));
        processListContract.methods
          .updateLastProcess(state.currentProcessId, 8, r.transactionHash)
          .send({
            from: state.publicKey,
          })
          .then((r) => {
            console.log(r);
            setStep(8);
          });
      });
  };
  return (
    <div className="d-flex flex-column w-100 mb-3">
      <Button color="primary" className="mt-4" onClick={envoyerTransaction}>
        Issue PVD
      </Button>
    </div>
  );
};

export default TransactionLabo;
