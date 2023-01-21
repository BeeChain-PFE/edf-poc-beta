import React, { useState } from "react";

import "./input-field.scss";

const InputField = ({
  label,
  value,
  placeholder,
  onChange,
  className,
  checkbox,
  isChecked,
  inputChange,
}) => {
  const [valueState, setValueState] = useState(value);
  const onInputChange = (event) => {
    setValueState(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <div className={"d-flex align-items-center input-field " + className}>
      <div className="input-field-label w-50 p-2">{label}</div>
      <div className="input-field-input w-50 p-2">
        <input
          value={valueState}
          type="select"
          placeholder={placeholder}
          disabled={!inputChange}
          onChange={onInputChange}
        />
      </div>
      {checkbox ? (
        <div className="form-check view-switch ">
          <input
            className="view-check-input"
            type="checkbox"
            onChange={onChange}
            checked={isChecked}
          />
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
