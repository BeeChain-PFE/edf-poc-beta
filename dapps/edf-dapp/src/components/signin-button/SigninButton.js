import React from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import "./signin-button.scss";

const SigninButton = ({ className, setIsConnected }) => {
  const navigate = useNavigate();
  const web3 = new Web3(window.ethereum);
  const handleDisconnect = async () => {
    // if (web3) {
    //   try {
    //     await web3.clearCachedProvider();
    //     console.log("User has been disconnected from MetaMask.");
    //   } catch (error) {
    //     console.error("Error disconnecting user from MetaMask: ", error);
    //   }
    // }
    setIsConnected(false);
    navigate("/");
  };
  return (
    <button
      className={`button primary ${className}`}
      onClick={handleDisconnect}
    >
      Se déconnecter
    </button>
  );
};

export default SigninButton;
