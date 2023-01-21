import * as React from "react";
import "./verifier.scss";
import BackButton from "../../components/back-button/backButton";
import Pagetitle from "../../components/page-title/pageTitle";
import VerefierTable from "../../components/verifier-table/verifiableTable";
import { Link } from "react-router-dom";

const Verifier = () => {
  return (
    <div>
      <div className="d-flex p-3">
        <div className="me-4">
          <BackButton link="/did-management" color="purpure"></BackButton>
        </div>

        <Pagetitle
          title="verifier"
          subtitle="Verifiable Credentials"
        ></Pagetitle>
      </div>

      <h4 className="mb-4">Request and verify third party VC</h4>
      <div>
        <p>
          In this tab you can create and sign (issue) VC documents for a
          specific recipient (including yourself). The issued document can be
          revoked and its data can be viewed.
        </p>
        <div className="conte">
          <Link to="/create-verifier">
            {" "}
            <button className="button primary button-sm w-auto px-3 text-nowrap">
              Create VC request
            </button>
          </Link>
        </div>
        <div>
          <VerefierTable />
        </div>
      </div>
    </div>
  );
};

export default Verifier;
