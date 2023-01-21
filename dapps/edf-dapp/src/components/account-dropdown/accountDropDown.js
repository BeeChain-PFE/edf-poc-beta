import React, { useState } from "react";
import { store } from "../../common/store";
import { ReactComponent as Union } from "../../assets/images/union.svg";
import { ReactComponent as Vector } from "../../assets/images/vector.svg";
import "./account-dropdown.scss";

const AccountDropDown = () => {
  // useEffect(() => {
  //   store.subscribe(() => {
  //     const storeState = store.getState();
  //     setIsSignedIn(!!storeState.signin?.publicKey);
  //   });
  //   // this.unsubscribe && this.unsubscribe();
  // }, []);
  const [publicKey, setPublickey] = useState(null);
  const getShorterKey = () => {
    store.subscribe(() => {
      const state = store.getState();
      setPublickey(state.signin.publicKey);
    });
    if (publicKey)
      return `${publicKey?.substr(0, 5)}...${publicKey?.substr(
        publicKey?.length - 6
      )}`;
  };
  return (
    <div className="account-dropdown d-flex text-white">
      <div className="union">{<Union></Union>}</div>
      <div className="px-2">{getShorterKey()}</div>
      <div className="text-white">{<Vector></Vector>}</div>
    </div>
  );
};

export default AccountDropDown;
