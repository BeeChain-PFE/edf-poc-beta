import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountDropdown from "../account-dropdown/accountDropDown";
// import { Logo } from "../logo/logo";
import SigninButton from "../signin-button/SigninButton";
import { store } from "../../common/store";
import Title from "../title/title";
import "./header.scss";

const Header = ({ setisConnected, isConnected }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [typeAccount, setTypeAccount] = useState(null);
  const [proccessState, setProcessState] = useState(null);

  useEffect(() => {
    console.log("header");
    // setIsSignedIn(!!storeState.signin?.publicKey);
    // setTypeAccount(storeState.signin?.typeAccount);
    // console.log(storeState.signin);
    store.subscribe(() => {
      console.log("is signed in :" + isSignedIn);
      const storeState = store.getState();
      setIsSignedIn(!!storeState?.publicKey);
      setTypeAccount(storeState?.typeAccount);
      setProcessState(storeState?.currentProcessState);
    });
  }, []);
  const getTypeAccount = () => {
    if (!isConnected) return "bg-warning";
    else {
      if (typeAccount === "fournisseur") return "bg-info";
      if (typeAccount === "labo") return "bg-success";
      if (typeAccount === "client") return "bg-primary";
    }
  };
  return (
    <header className={`app-header ${getTypeAccount()}`}>
      {/* <Logo></Logo> */}
      <div className="left">
        <Title></Title>
        <div>
          {isConnected && (
            <ul className="">
              <li>
                {typeAccount === "labo" && proccessState === 7 && (
                  <Link to="/transactions-labo-envoyer">Envoyer</Link>
                )}
              </li>
              <li>
                {typeAccount === "labo" && (
                  <Link to="/transactions-labo-lister">Lister</Link>
                )}
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
                  <Link to="/transactions-client-valider">Pvd</Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="right">
        <div className="right-account-dropdown">
          {isConnected && (
            <AccountDropdown
              isConnected={isConnected}
              typeAccount={typeAccount}
            ></AccountDropdown>
          )}
        </div>
        <div>
          {isConnected && (
            <SigninButton
              isConnected={isConnected}
              setIsConnected={setisConnected}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
