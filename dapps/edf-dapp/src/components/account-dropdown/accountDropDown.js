import React, { useState, useEffect } from "react";
import { store } from "../../common/store";
import { ReactComponent as Union } from "../../assets/images/union.svg";
import { ReactComponent as Vector } from "../../assets/images/vector.svg";
import "./account-dropdown.scss";

const AccountDropDown = () => {
  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      console.log(state.publicKey);
      setPublickey(state.publicKey);
    });
    // this.unsubscribe && this.unsubscribe();
  }, []);
  const [publicKey, setPublickey] = useState(null);

  return (
    <div className="account-dropdown d-flex text-white">
      <div className="union">{<Union></Union>}</div>
      <div className="px-2">{`${publicKey?.substr(0, 5)}...${publicKey?.substr(
        publicKey?.length - 6
      )}`}</div>
      <div className="text-white">{<Vector></Vector>}</div>
    </div>
  );
};

export default AccountDropDown;
