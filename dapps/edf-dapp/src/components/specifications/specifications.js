import React from "react";
import InputField from "../input-field/InputField";
import PageTitle from "../page-title/pageTitle";
import Select from "../select/select";

const Specifications = ({ index, setQuantity, setTest, setItem }) => {
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
        label={"test"}
        options={["test1", "test2", "test3"]}
        onChange={(r) =>
          setTest((q) => {
            let myArray = [...q];
            myArray[index - 1] = r;
            return myArray;
          })
        }
      />
    </div>
  );
};

export default Specifications;
