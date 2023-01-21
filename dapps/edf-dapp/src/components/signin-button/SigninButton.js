import React from "react";

import "./signin-button.scss";

const SigninButton = ({ className }) => {
  const onButtonClick = () => {
    // SignerHelper.sendConnectionRequest();
    // const unsubscribe = store.subscribe(() => {
    //     const state = store.getState();
    //     if (state.signin.publicKey) {
    //         history.push('/did-management');
    //     }
    //     unsubscribe();
    // });
  };

  return (
    <button className={`button primary ${className}`} onClick={onButtonClick}>
      Se déconnecter
    </button>
  );
};

export default SigninButton;
