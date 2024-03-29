import React, { useState } from "react";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";

const SpecificationsCient = ({ index, setQuantity, setTest, setItem }) => {
  const [testList, setTestList] = useState([]);

  const [testValue, setTestValue] = useState(["Tests de flexion"]);

  const addTest = () => {
    setTestValue((p) => {
      let myArray = [...p];
      myArray[testList.length + 1] = "Tests de flexion";
      setTest((q) => {
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
          label={`test ${testList.length + 2}`}
          options={[
            "Tests de flexion",
            "Tests de torsion",
            "Tests de déformation",
            "Tests de résistance à la rupture",
            "Tests de fatigue",
            "Tests de débit",
            "Tests de cavitation",
            "Tests de stabilité",
          ]}
          onChange={(r) => {
            setTestValue((p) => {
              let myArray = [...p];
              myArray[testList.length + 1] = r;
              setTest((q) => {
                let arrayTest = [...q];
                arrayTest[index - 1] = myArray;
                return arrayTest;
              });
              console.log(myArray);
              return myArray;
            });
          }}
        />
      )
    );
  };
  return (
    <div>
      <PageTitle subtitle={"Spécification piece " + index} />
      <Select
        className="mb-2"
        label={"pièce"}
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
      <InputField
        label={"quantité"}
        className="mb-2"
        inputChange={true}
        placeholder={"quantité2"}
        onChange={(r) =>
          setQuantity((q) => {
            let myArray = [...q];
            myArray[index - 1] = r;
            return myArray;
          })
        }
      />

      <Select
        className="mb-2"
        label={`test 1`}
        options={[
          "Tests de flexion",
          "Tests de torsion",
          "Tests de déformation",
          "Tests de résistance à la rupture",
          "Tests de fatigue",
          "Tests de débit",
          "Tests de cavitation",
          "Tests de stabilité",
        ]}
        onChange={(r) => {
          setTestValue((p) => {
            let myArray = [...p];
            myArray[0] = r;
            setTest((q) => {
              let arrayTest = [...q];

              arrayTest[index - 1] = myArray;
              return arrayTest;
            });
            console.log(myArray);
            return myArray;
          });
        }}
      />
      {testList}
      <Button color="primary" className="mt-2" onClick={addTest}>
        Add Test
      </Button>
    </div>
  );
};

export default SpecificationsCient;
