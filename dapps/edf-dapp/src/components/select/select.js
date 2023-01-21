import React, { useState } from "react";
import "./select.scss";
const Select = ({ options, label, className, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const onSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <>
      <div className={"d-flex align-items-center select-field " + className}>
        <div className="select-field-label w-50 p-2">{label}</div>
        <div className="select-field-input w-50 p-2">
          <select value={selectedOption} onChange={(e) => onSelectChange(e)}>
            {options.map((value, i) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Select;
