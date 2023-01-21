import React, { useState } from "react";
import ReactModal from "react-modal";
// import { changeVpRequestStatus } from "../../common/actions/change-vp-request-status-action";
import DATA_FIELDS_SHEMA from "../../common/dataFieldSchema";
// import { store } from "../../common/store";
import Button from "../button/button";
import InputField from "../input-field/InputField";
import "./view-did-dialog.scss";

const ViewDidDIalog = ({ verpRequest, onClose }) => {
  const [vpRequest, setVpRequest] = useState(verpRequest);
  const [data, setData] = useState(mapData(vpRequest));
  const togle = {
    personal: true,
    education: true,
  };

  const onCancelButtonClick = () => {
    emitCloseEvent();
  };

  const onRejectButtonClick = () => {
    // rejectVpRequest(this.props.vpRequest)
    //     .then(() => this.emitCloseEvent());
    // store.dispatch(changeVpRequestStatus(this.props.vpRequest.ipfsHash, 2, []));
    emitCloseEvent();
  };

  const onApproveButtonClick = () => {
    const d = data.map((t) => ({
      credentialType: t.credentialType,
      items: t.items.map((x) => ({ field: x.field, value: x.value })),
    }));
    // store.dispatch(changeVpRequestStatus(this.props.vpRequest.ipfsHash, 1, data));
    emitCloseEvent();
  };

  const emitCloseEvent = (data) => {
    if (onClose) {
      onClose(data);
    }
  };

  const mapData = (vcRequest) => {
    const categories = DATA_FIELDS_SHEMA.filter((group) =>
      vcRequest.claims.some((c) => group.items.some((t) => !!t[c.claimType]))
    );
    const result = categories
      .map((c) => {
        const items = [];
        c.items.forEach((t) => {
          const entries = Object.entries(t)[0];
          const [field, title] = entries;
          if (vcRequest.claims.some((x) => field == x.claimType)) {
            const value = findValueByField(field);
            if (value) {
              items.push({ title, field, value });
            }
          }
        });
        return {
          credentialType: c.credentialType,
          title: c.title,
          items,
        };
      })
      .filter((t) => !!t.items.length);
    return result;
  };

  const findValueByField = (field) => {
    // const state = store.getState();
    // const vc = state.holder?.vcs.find((t) => t.credentialSubject[field]);
    // return vc?.credentialSubject[field] || null;
  };
  const changeChecked = (event, key, prop) => {
    //this.setState({ ...this.state, [key]: { ...this.state[key], [prop]: { checked: event.target.checked } } })
  };

  return (
    <ReactModal
      className="view-did-dialog d-flex flex-column justify-content-between"
      isOpen={true}
    >
      <div className="overflow-auto scroll-hide field-box">
        <h5 className="fw-bold mb-3 mt-2">VC Request permission</h5>

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
      </div>
      {!vpRequest.status && (
        <div className="d-flex justify-content-end align-items-center btn-box">
          <Button onClick={onCancelButtonClick} className="m-lg-1">
            Cancel
          </Button>
          <Button
            onClick={onRejectButtonClick}
            className="ms-2 bg-danger text-white"
          >
            Reject request
          </Button>
          <Button
            color="primary"
            className="m-lg-1"
            onClick={onApproveButtonClick}
          >
            Approve
          </Button>
        </div>
      )}
      {vpRequest.status && (
        <div className="d-flex justify-content-end align-items-center btn-box">
          <Button onClick={onCancelButtonClick} className="m-lg-1">
            Close
          </Button>
        </div>
      )}
    </ReactModal>
  );
};

export default ViewDidDIalog;
