import React, { useEffect, useState } from "react";
// import { RouteComponentProps, withRouter } from "react-router-dom";
import { store } from "../../common/store";
// import { CasperSignerBlock } from "../../components/casper-signer-block/casper-signer-block";
import LedgerBlock from "../../components/ledger-block/ledgerBlock";

import "./home.scss";

import logo from "../../images/logo.png"; // Importez votre logo
import Image from "../../images/home-page.jpg";

const Home = ({ setisConnected }) => {
  const [typeAccount, setTypeAccount] = useState(null);
  useEffect(() => {
    // const state = store.getState();
    // console.log(state.publicKey);
    // console.log(state);
    const state = store.getState();
    const unsubscribe = store.subscribe(() => {
      console.log(state);
      setTypeAccount(state?.typeAccount);
      if (state.publicKey) unsubscribe();
    });
  }, []);

  return (
    <div className="mt-4 d-flex flex-row">
      <div className="home-page d-flex flex-column ">
        <div className="d-flex flex-row">
          <div className="home-page-logo">
            <img src={logo} alt="Logo de notre entreprise" />
          </div>
          <div className="d-flex align-items-center">
            <h1>Bienvenue sur notre site de traçabilité nucléaire</h1>
          </div>
        </div>
        <div className="d-flex flex-row mt-5">
          <div className="home-page-text">
            <p>
              Notre site vous permet de suivre l'origine et le parcours de vos
              produits de manière simple et efficace.
            </p>
            <p>
              Grâce à notre PVD (Proces Verbale Décentralisé) vous pouvez
              facilement vérifier la qualité et l'authenticité de vos produits,
              en toute transparence.
            </p>
            <div className="home-page-image">
              <img src={Image} alt="home-page" />
            </div>
            <p>
              Pour garantir la transparence et l'intégrité de nos données, nous
              utilisons la technologie de la blockchain pour enregistrer toutes
              les informations sur l'origine et le parcours de nos produits.
            </p>
            <p>
              N'hésitez pas à nous contacter si vous avez des questions ou si
              vous souhaitez en savoir plus sur notre processus de traçabilité.
            </p>
          </div>
          <div className=" d-flex align-items-center">
            <LedgerBlock setisConnected={setisConnected} />
          </div>
        </div>
      </div>

      <hr />
      {/* <div>{typeAccount === "labo" && <ListerTransactionsLabo />}</div>
      <div>{typeAccount === "client" && <ListerTransactionsClient />}</div> */}
    </div>
  );
};

export default Home;
