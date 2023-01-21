import React, { useState } from "react";
import ReactModal from "react-modal";

import DATA_FIELDS_SHEMA from "../../common/dataFieldSchema";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import "./verifiable-credentials-dialog.scss";

const VerifiableCredentialDialogue = ({ vpRequest, onClose }) => {
  const [data, setData] = useState(mapData(vpRequest));
  const mapData = (vcRequest) => {
    const response = vcRequest.response;
    return response.map((t) => {
      const category = DATA_FIELDS_SHEMA.find(
        (x) => x.credentialType == t.credentialType
      );
      return {
        ...t,
        title: category?.title || null,
        items: t.items.map((x) => ({
          ...x,
          title: category?.items.find((f) => !!f[x.field])[x.field] || null,
        })),
      };
    });
  };
  const onCloseButtonClick = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
  return (
    <ReactModal
      className="verifiable-credentials-dialog d-flex flex-column justify-content-between"
      isOpen={true}
    >
      <h5 className="fw-bold mb-3 mt-2">View verifiable credentials</h5>

      {data.map((category, index) => (
        <div className="mb-3" key={"category-" + index}>
          <div className="d-flex flex-row justify-content-between mb-2">
            <div className="fw-bold ">{category.title}</div>
          </div>
          {category.items.map((item, itemIndex) => (
            <InputField
              key={"item-" + itemIndex}
              label={item.title}
              value={item.value}
              className="mb-2"
            />
          ))}
        </div>
      ))}
      <div className="d-flex justify-content-center align-items-center btn-box">
        <Button
          color="primary"
          onClick={this.onCloseButtonClick}
          className="m-lg-1"
        >
          Close
        </Button>
      </div>
    </ReactModal>
  );
};

export default VerifiableCredentialDialogue;
