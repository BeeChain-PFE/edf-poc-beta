import React, { useState } from "react";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";

const SpecificationsCient = ({ index, setQuantity, setTest, setItem }) => {
  const [testList, setTestList] = useState([]);

  const [testValue, setTestValue] = useState(["test1"]);

  const addTest = () => {
    setTestValue((p) => {
      let myArray = [...p];
      myArray[testList.length + 1] = "test1";
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
          options={["test1", "test2", "test3"]}
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
      <InputField
        label={"quantity"}
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
        options={["test1", "test2", "test3"]}
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
