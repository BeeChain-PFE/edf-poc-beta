import React, { useState } from "react";
import ReactModal from "react-modal";
import DATA_FIELDS_SHEMA from "../../common/dataFieldSchema";
// import { store } from "../../common/store";
import Button from "../button/button";
import InputField from "../input-field/InputField";

import "./view-did-read-dialog.scss";

const ViewDidReadDialog = ({ credentialType, onClose }) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  //   const storeState = store.getState();
  //   const vc = storeState.holder.vcs.find(
  //     (t) => t.type.indexOf(this.props.credentialType) > -1
  //   );
  const schema = DATA_FIELDS_SHEMA.find(
    (t) => t.credentialType === credentialType
  );
  if (schema) setTitle(schema.title);
  //   if (vc && schema) {
  //     const entries = Object.entries(vc.credentialSubject);
  //     setData(
  //       entries
  //         .map((ent) => {
  //           const [key, value] = ent;
  //           const item = schema.items.find((x) => {
  //             const [k] = Object.entries(x)[0];
  //             return k.toLowerCase() === key.toLowerCase();
  //           });
  //           const title = item ? item[key] : null;

  //           return title ? { title, value } : null;
  //         })
  //         .filter((t) => !!t)
  //     );
  //   }
  return (
    <ReactModal
      className="view-did-read-dialog d-flex flex-column justify-content-between "
      isOpen={true}
    >
      <h4 className="mb-3"> View DID Document</h4>

      <div className="mb-3">
        <h5>{title && title}</h5>
        {data?.length &&
          data.map((item, index) => (
            <InputField
              key={"item-" + index}
              label={item.title}
              value={item.value}
              className="mb-2"
            />
          ))}
      </div>

      <div className="d-flex justify-content-end">
        <Button className="me-2" onClick={onClose}>
          Close
        </Button>
      </div>
    </ReactModal>
  );
};

export default ViewDidReadDialog;
