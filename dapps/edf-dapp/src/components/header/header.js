import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountDropdown from "../account-dropdown/accountDropDown";
// import { Logo } from "../logo/logo";
import SigninButton from "../signin-button/SigninButton";
import { store } from "../../common/store";
import Title from "../title/title";
import "./header.scss";

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [typeAccount, setTypeAccount] = useState(null);
  useEffect(() => {
    console.log("header");
    // setIsSignedIn(!!storeState.signin?.publicKey);
    // setTypeAccount(storeState.signin?.typeAccount);
    // console.log(storeState.signin);
    store.subscribe(() => {
      const storeState = store.getState();
      setIsSignedIn(!!storeState?.publicKey);
      setTypeAccount(storeState?.typeAccount);
    });
  }, []);
  return (
    <header className="app-header ">
      {/* <Logo></Logo> */}
      <div className="left">
        <Title></Title>
        <ul className="">
          <li className="">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/did-management">Did</Link>
          </li>
          <li>
            {typeAccount === "fournisseur" && (
              <Link to="/transactions-fournisseur-envoyer">Envoyer</Link>
            )}
          </li>
          <li>
            {typeAccount === "fournisseur" && (
              <Link to="/transactions-fournisseur-lister">Lister</Link>
            )}
          </li>
          <li>
            {typeAccount === "fournisseur" && (
              <Link to="/transactions-fournisseur-valider">Valider</Link>
            )}
          </li>
          <li>
            {typeAccount === "labo" && (
              <Link to="/transactions-labo-envoyer">Envoyer</Link>
            )}
          </li>
          <li>
            {typeAccount === "labo" && (
              <Link to="/transactions-labo-lister">Lister</Link>
            )}
          </li>
          <li>
            {typeAccount === "labo" && (
              <Link to="/transactions-labo-valider">Valider</Link>
            )}
          </li>
          <li>
            {typeAccount === "client" && (
              <Link to="/transactions-client-envoyer">Envoyer</Link>
            )}
          </li>
          <li>
            {typeAccount === "client" && (
              <Link to="/transactions-client-lister">Lister</Link>
            )}
          </li>
          <li>
            {typeAccount === "client" && (
              <Link to="/transactions-client-valider">Valider</Link>
            )}
          </li>
        </ul>
      </div>

      <div className="right">
        <div className="right-account-dropdown">
          {isSignedIn && <AccountDropdown></AccountDropdown>}
        </div>
        <div> {isSignedIn && <SigninButton></SigninButton>}</div>
      </div>
    </header>
  );
};

export default Header;
