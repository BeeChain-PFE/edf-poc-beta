import React from "react";
import Button from "../button/button";

const ValidationCard = ({ changeState, setLoading }) => {
  return (
    <>
      <div
        className="card"
        style={{ width: "100%", border: "1px solid rgba(0,0,0,.125)" }}
      >
        <div className="card-body d-flex justify-content-center flex-column">
          <h5 className="card-title">Prise en charge de la commande</h5>
          <h6 className="card-subtitle mb-2 text-muted">Transaction Client</h6>
          <p className="card-text">Validation de la commande des pièces</p>
          <Button
            color="primary"
            className="mr-2"
            onClick={() => changeState(2)}
          >
            OUI
          </Button>
          <Button
            color="warning"
            className="ml-4"
            onClick={() => changeState(1)}
          >
            NON
          </Button>
        </div>
      </div>
    </>
  );
};

export default ValidationCard;
