import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/test/Test";

import Home from "./pages/home/home";
import Header from "./components/header/header";
import { Persistor, store } from "./common/store";
import { Provider } from "react-redux";
import TransactionFournisseur from "./pages/fournisseur/envoyerTransactionFournisseur";
import EnvoyerTransactionClient from "./pages/client/envoyerTransactionClient";
import EnvoyerTransactionFournisseur from "./pages/fournisseur/envoyerTransactionFournisseur";
import { PersistGate } from "redux-persist/integration/react";
import ListerTransactionFournisseur from "./pages/fournisseur/ListerTransactionFournisseur";
import ListerTransactionsClient from "./pages/client/listerTransactionClient";
import EnvoyerTransactionLabo from "./pages/labo/envoyerTransactionLabo";
import ListerTransactionsLabo from "./pages/labo/listerTransactionLabo";

import Pvd from "./components/pvd/pvd";
import HolderListPv from "./components/holder-list-pvd/holderListPvd";
import DidRegistry from "./pages/didRegistry/didRegistry";

export default function App() {
  const [isConnected, setisConnected] = useState(false);

  // store.subscribe(() => {
  //   const storeState = store.getState();
  // });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Router>
          {<Header setisConnected={setisConnected} isConnected={isConnected} />}
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/users" element={<h2>Users</h2>} />
            <Route
              path="/transactions-fournisseur-envoyer"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <EnvoyerTransactionFournisseur />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-fournisseur-lister/:idProccess"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <ListerTransactionFournisseur />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/did-registry"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <DidRegistry />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-fournisseur-lister"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <ListerTransactionFournisseur />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-fournisseur-valider"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <EnvoyerTransactionFournisseur />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-labo-envoyer"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <EnvoyerTransactionLabo />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-labo-lister"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <ListerTransactionsLabo />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-labo-valider"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <TransactionFournisseur />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-client-envoyer"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <EnvoyerTransactionClient />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-client-lister/"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <ListerTransactionsClient />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-client-lister/:idProccess"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <ListerTransactionsClient />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-client-valider"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <HolderListPv />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/pvd/:id"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <Pvd />
                  </div>
                </div>
              }
            ></Route>

            <Route
              path="/"
              element={
                // <div className="page-bg-blue">
                //   <div className="container">
                //     <Home />
                //   </div>
                // </div>
                <div className="page-bg-blue">
                  <div className="container">
                    <Home setisConnected={setisConnected} />
                    {/* <ListerTransactionsClient /> */}
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}
