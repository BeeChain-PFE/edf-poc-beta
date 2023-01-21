import React, { useState } from "react";
import Button from "../../components/button/button";
import PageTitle from "../../components/page-title/pageTitle";
// import { KeyField } from "../../components/key-field/key-field";
import PillTab from "../../components/pill-tab/pillTab";
import "./did-management.scss";
import API_BASE_URL from "../../api/configuration.json";
import { IMPORT_KEY, GENERATE_DID } from "../../api/paths";
import { store } from "../../common/store";
import { ADD_KEY } from "../../common/reducers/types";
const DidManagement = () => {
  const [didCreated, setDidCreated] = useState(false);
  const [keyGenerated, setKeyGenerated] = useState(null);
  const storeState = store.getState();

  const generateDid = () => {
    fetch(
      `https://mkjwk.org/jwk/okp?alg=EdDSA&use=sig&kid=${storeState.signin.publicKey}&gen=specified&crv=Ed25519`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        const body = JSON.stringify(r.jwk);
        fetch(`${API_BASE_URL.WALTID_CORE_API}${IMPORT_KEY}`, {
          method: "POST",
          body,
        })
          .then((r) => r.json())
          .then((r) => {
            setKeyGenerated(r.id);
            const body = JSON.stringify({
              method: "ebsi",
              keyAlias: r.id,
            });
            fetch(`${API_BASE_URL.WALTID_CORE_API}${GENERATE_DID}`, {
              method: "POST",
              body,
            })
              .then((r) => r.text())
              .then((r) => {
                console.log(r);
                store.dispatch({
                  type: ADD_KEY,
                  payload: { did: r },
                });
                setDidCreated(r);
              });
          });
      });
  };
  return (
    <div>
      <div className="d-flex pt-3">
        <PillTab
          title="issuer"
          description="Verifiable Credentials"
          link="/issuer"
          color="blue"
        ></PillTab>
        <PillTab
          title="holder"
          description="Verifiable Credentials"
          link="/holder"
          color="pink"
        ></PillTab>
        <PillTab
          title="verifier"
          description="Verifiable Credentials"
          link="/verifier"
          color="purpure"
        ></PillTab>
      </div>

      {/* <h4 className="my-4">Account</h4> */}
      <hr />
      <PageTitle
        title={"Generation Did"}
        subtitle={
          "Cette requête vous permet de créer un DID à l’aide de votre clé"
        }
      />
      <Button children={"Générer Did"} color="primary" onClick={generateDid} />
      <p> did généré : {didCreated}</p>
      <hr />
      {/* {this.state?.publicKey &&
        <>
            <KeyField name="Public Key" value={this.state?.publicKey}></KeyField>
            <KeyField name="Account Hash" value={this.state?.accountHash}></KeyField>
            <KeyField name="DID" value={this.state?.did}></KeyField>
        </>
    } */}
    </div>
  );
};

export default DidManagement;
