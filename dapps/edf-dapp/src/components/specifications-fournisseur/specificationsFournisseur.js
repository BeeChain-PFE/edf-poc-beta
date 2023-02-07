import React, { useState } from "react";
import Button from "../button/button";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";

const SpecificationsFournisseur = ({
  index,
  setSize,
  setPoids,
  setMaterials,
  setItem,
}) => {
  const [testList, setTestList] = useState([]);
  const [testValue, setTestValue] = useState([]);
  const addTest = () => {
    setTestValue((p) => {
      let myArray = [...p];
      myArray[testList.length + 1] = "Acier inoxydable";
      setMaterials((q) => {
        let arrayTest = [...q];
        arrayTest[index - 1] = myArray;
        return arrayTest;
      });
      return myArray;
    });
    setTestList(
      testList.concat(
        <Select
          key={testList.length + 1}
          className="mb-2"
          label={`material ${testList.length + 2}`}
          options={[
            "Acier inoxydable",
            "alliages de nickel",
            "céramiques",
            "graphite",
            "plastiques",
          ]}
          onChange={(r) => {
            setTestValue((p) => {
              let myArray = [...p];
              myArray[testList.length + 1] = r;
              setMaterials((q) => {
                let arrayTest = [...q];
                arrayTest[index - 1] = myArray;
                return arrayTest;
              });
              return myArray;
            });
          }}
        />
      )
    );
  };
  return (
    <div>
      <PageTitle subtitle={"Caractéristique piece " + index} />
      <Select
        className="mb-2"
        label={"piece"}
        options={[
          "Turbine à gaz",
          "Pompes à eau",
          "Barres de contrôle",
          "cuve de réacteur",
        ]}
        onChange={(r) => {
          setItem((q) => {
            let myArray = [...q];
            myArray[index - 1] = r;
            return myArray;
          });
        }}
      />
      <Select
        className="mb-2"
        label={"size"}
        options={["10 cm", "20 cm", "30 cm", "50 cm", "100 cm"]}
        onChange={(r) => {
          setSize((q) => {
            let myArray = [...q];
            myArray[index - 1] = r;
            return myArray;
          });
        }}
      />
      <Select
        className="mb-2"
        label={"poids"}
        options={["10 g", "20 g", "30 g", "50 g", "100 g"]}
        onChange={(r) => {
          setPoids((q) => {
            let myArray = [...q];
            myArray[index - 1] = r;
            return myArray;
          });
        }}
      />

      <Select
        className="mb-2"
        label={`material`}
        options={[
          "Acier inoxydable",
          "alliages de nickel",
          "céramiques",
          "graphite",
          "plastiques",
        ]}
        onChange={(r) => {
          setTestValue((p) => {
            let myArray = [...p];
            myArray[0] = r;
            setMaterials((q) => {
              let arrayTest = [...q];
              arrayTest[index - 1] = myArray;
              return arrayTest;
            });
            return myArray;
          });
        }}
      />
      {testList}
      <Button color="primary" className="mt-2" onClick={addTest}>
        Add Material
      </Button>
    </div>
  );
};

export default SpecificationsFournisseur;
