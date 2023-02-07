import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Api from "../../api/configuration.json";

const HolderListPv = () => {
  const [pvData, setPvData] = useState([]);

  useEffect(() => {
    try {
      fetch(Api.WALTID_HOLDER_API + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "holder@edf.fr", password: "holder" }),
      })
        .then((r) => r.json())
        .then((data) => {
          fetch(Api.WALTID_HOLDER_API + "/api/wallet/credentials/list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setPvData(data.list);
            });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const token = localStorage.getItem("token");
  if (!token)
    fetch(Api.WALTID_HOLDER_API + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "holder@edf.fr", password: "holder" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Save the token to local storage
        localStorage.setItem("token", data.token);
        console.log(data.token);
      });

  return (
    <div>
      {pvData &&
        pvData.map(({ id, issuer, type, proof }, index) => (
          <Link to={`/pvd/${id}`}>
            <Card style={cardStyle} key={id}>
              <Card.Body>
                <Card.Title>PVD {index + 1}</Card.Title>
                <Card.Title>id: {id}</Card.Title>
                <Card.Text>issuer: {issuer}</Card.Text>
                <Card.Text>date: {proof.created.split("T")[0]}</Card.Text>
                <Card.Text>
                  heure:{" "}
                  {proof.created
                    .split("T")[1]
                    .substr(0, proof.created.split("T")[1].length - 1)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      {/* <JSONPretty id="json-pretty" data={pvData.list}></JSONPretty> */}
    </div>
  );
};
const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "50px",
};

const cardStyle = {
  width: "400px",
  margin: "10px",
};
export default HolderListPv;
