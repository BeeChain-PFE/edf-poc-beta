import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JSONPretty from "react-json-pretty";
import Api from "../../api/configuration.json";
const Pvd = () => {
  const [token, settoken] = useState();
  const { id } = useParams();
  const [pvd, setPvd] = useState([]);
  useEffect(() => {
    fetch(Api.WALTID_HOLDER_API + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "holder@edf.fr", password: "holder" }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        // Save the token to local storage
        console.log("login");
        console.log(data.token);
        await fetch(
          Api.WALTID_HOLDER_API + "/api/wallet/credentials/list?id=" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob2xkZXJAZWRmLmZyIn0.M4vRoTdGkrGvpYXp2GwHHPKE_G70-ke3ghak_DOWZWM`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setPvd(data.list);
            console.log(data);
          });
      }, []);
  });

  return (
    <div>
      Pvd {id}
      <JSONPretty id="json-pretty" data={pvd[0]}></JSONPretty>
    </div>
  );
};

export default Pvd;
