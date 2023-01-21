import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/test/Test";
import Navbar from "./components/navbar/NavBar";
import DidManagement from "./pages/did-management/didManagement";
import Issuer from "./pages/issuer/issuer";
import CreateDidDocument from "./pages/create-did-document/createDidDocument";
import Holder from "./pages/holder/Holder";
import Home from "./pages/home/home";
import Verifier from "./pages/verifier/verifier";
import Header from "./components/header/header";
import { Persistor, store } from "./common/store";
import { Provider } from "react-redux";
import TransactionFournisseur from "./pages/fournisseur/envoyerTransactionFournisseur";
import EnvoyerTransactionClient from "./pages/client/envoyerTransactionClient";
import EnvoyerTransactionFournisseur from "./pages/fournisseur/envoyerTransactionFournisseur";
import { PersistGate } from "redux-persist/integration/react";
import ListerTransactionFournisseur from "./pages/fournisseur/ListerTransactionFournisseur";
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/users" element={<h2>Users</h2>} />
            <Route
              path="/did-management"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <DidManagement />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/issuer"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <Issuer />
                  </div>
                </div>
              }
            ></Route>
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
                    <TransactionFournisseur />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-labo-lister"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <TransactionFournisseur />
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
              path="/transactions-client-lister"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <EnvoyerTransactionClient />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/transactions-client-valider"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <EnvoyerTransactionClient />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/create-did-document"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <CreateDidDocument />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/holder"
              element={
                <div className="page-bg-pink">
                  <div className="container">
                    <Holder />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/verifier"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <Verifier />
                  </div>
                </div>
              }
            />
            {/* <Route
          path="/create-verifier"
          element={
            <div className="page-bg-blue">
              <div className="container">
                <CreateVerifierRequest />
              </div>
            </div>
          }
        /> */}
            <Route
              path="/"
              element={
                <div className="page-bg-blue">
                  <div className="container">
                    <Home />
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
