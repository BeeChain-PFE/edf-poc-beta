import React, { useState } from "react";
import web3 from "web3";
import { didRegistryContract } from "../../common/contracts/didRegistryContract.js";

function DidRegistry() {
  const [transactionHash1, setTransactionHash1] = useState(null);
  const [transactionHash2, setTransactionHash2] = useState(null);
  const [transactionHash3, setTransactionHash3] = useState(null);
  const [transactionHash4, setTransactionHash4] = useState(null);
  const [transactionHash5, setTransactionHash5] = useState(null);
  const [transactionHash6, setTransactionHash6] = useState(null);
  const [transactionHash7, setTransactionHash7] = useState(null);
  const [transactionHash8, setTransactionHash8] = useState(null);
  const [transactionHash9, setTransactionHash9] = useState(null);
  const [transactionHash10, setTransactionHash10] = useState(null);
  const [transactionHash11, setTransactionHash11] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const tx = await didRegistryContract.methods
        .addOwner(
          "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
          "did:ebsi:zhninDTLuu9pvqHs8BgZtQP",
          "Edf"
        )
        .send({ from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" });
      setTransactionHash1(tx.transactionHash);
      console.log(transactionHash1);
    } catch (error) {
      console.log(error);
    }

    try {
      const tx = await didRegistryContract.methods
        .addSupplier(
          "0x558523354FBffAb0baD9009F8a8a6eFc4F7455f6",
          "did:ebsi:zi1pRXt3cLVRz2zjiv9Fb1",
          "Framatome"
        )
        .send({ from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" });
      setTransactionHash2(tx.transactionHash);
    } catch (error) {
      console.log(error);
    }

    try {
      const tx = await didRegistryContract.methods
        .addSupplier(
          "0x5e557FF38aaE613cD4dCA65B5234435d3346c42C",
          "did:ebsi:z22x1uZ74ZZ3dSJSPsc52yoZ",
          "Mitsubishi Heavy Industries"
        )
        .send({ from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" });
      setTransactionHash3(tx.transactionHash);
    } catch (error) {
      console.log(error);
    }

    try {
      const tx = await didRegistryContract.methods
        .addSupplier(
          "0x4A3D0C1e09193202D636Fcb557443d9CFB4657Fa",
          "did:ebsi:ziBy8t7HdZaaRBhihaH9dQm",
          "Siemens  Energy"
        )
        .send({ from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" });
      setTransactionHash4(tx.transactionHash);
    } catch (error) {
      console.log(error);
    }

    try {
      const tx = await didRegistryContract.methods
        .addLaboratory(
          "0xdA13E0D15c96Ee43F8C0BBA1152Ed0D3c7B5C625",
          "did:ebsi:zuuQWaCtUuKgZLv6AtkxFtK",
          "CEA Cadarache"
        )
        .send({ from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" });
      setTransactionHash7(tx.transactionHash);
    } catch (error) {
      console.log(error);
    }
    try {
      const tx = await didRegistryContract.methods
        .addLaboratory(
          "0xd1Dc4435A078777ECcFb4aE4c1F88A795Ed3DFaD",
          "did:ebsi:z25JZjeEiBaBp3ea3cRvCqPa",
          "Institut de Technologie Nucléaire"
        )
        .send({ from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" });
      setTransactionHash8(tx.transactionHash);
    } catch (error) {
      console.log(error);
    }
    try {
      const tx = await didRegistryContract.methods
        .addLaboratory(
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
          "did:ebsi:ztQ8BXf3iDfWxbw7NgY4bWw",
          "Framatome Saint Marcel"
        )
        .send({ from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" });
      setTransactionHash9(tx.transactionHash);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllSuppliers = async () => {
    const suppliers = await didRegistryContract.methods
      .getAllSuppliers()
      .call();
    console.log(suppliers);
  };

  const getAllLaboratories = async () => {
    const laboratories = await didRegistryContract.methods
      .getAllLaboratories()
      .call();
    console.log(laboratories);
  };

  const getAllOwners = async () => {
    const suppliers = await didRegistryContract.methods.ownerCount().call();
    console.log(suppliers);
  };

  const getAll = async () => {
    getAllLaboratories();
    getAllOwners();
    getAllSuppliers();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Alimenter</button>
        {transactionHash1 && <p>Transaction hash1: {transactionHash1}</p>}
        {transactionHash2 && <p>Transaction hash2: {transactionHash2}</p>}
        {transactionHash3 && <p>Transaction hash3: {transactionHash3}</p>}
        {transactionHash4 && <p>Transaction hash3: {transactionHash4}</p>}
        {transactionHash5 && <p>Transaction hash3: {transactionHash5}</p>}
        {transactionHash6 && <p>Transaction hash3: {transactionHash6}</p>}
        {transactionHash7 && <p>Transaction hash3: {transactionHash7}</p>}
        {transactionHash8 && <p>Transaction hash3: {transactionHash8}</p>}
        {transactionHash9 && <p>Transaction hash3: {transactionHash9}</p>}
        {transactionHash10 && <p>Transaction hash3: {transactionHash10}</p>}
        {transactionHash11 && <p>Transaction hash3: {transactionHash11}</p>}
      </form>
      <button onClick={getAll}>Get all</button>
    </div>
  );
}
export default DidRegistry;
