import React, { useState } from "react";
import Button from "../button/button";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";

const SpecificationsLabo = ({
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
      myArray[testList.length + 1] = "material1";
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
          label={`test ${testList.length + 2}`}
          options={["material1", "material2", "material3"]}
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
      <PageTitle subtitle={"Spécification piece " + index} />
      <Select
        className="mb-2"
        label={"item"}
        options={["item1", "item2", "item3"]}
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
        options={["10 m", "20 m", "30 m"]}
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
        options={["10 tons", "20 tons", "30 tons"]}
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
        options={["material1", "material2", "material3"]}
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

export default SpecificationsLabo;
