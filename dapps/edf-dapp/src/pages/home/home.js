import React, { useEffect } from "react";
import SignerBloc from "../../components/signer-block/signerBloc";
// import { RouteComponentProps, withRouter } from "react-router-dom";
import { store } from "../../common/store";
// import { CasperSignerBlock } from "../../components/casper-signer-block/casper-signer-block";
import LedgerBlock from "../../components/ledger-block/ledgerBlock";
import ViewAddressBlock from "../../components/view-address-block/viewAddressBlock";
import Welcome from "../../components/welcome/welcome";
import "./home.scss";

const Home = ({ history }) => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.signin.publicKey) {
        unsubscribe();
      }
    });
  }, []);

  return (
    <div className="row p-3 p-md-5">
      <div className="col-12 col-md p-md-5">
        <Welcome></Welcome>
      </div>

      <div className="col col-md mt-4 mt-md-0 p-md-5">
        <LedgerBlock></LedgerBlock>

        <ViewAddressBlock></ViewAddressBlock>

        <SignerBloc></SignerBloc>
      </div>
    </div>
  );
};

export default Home;
