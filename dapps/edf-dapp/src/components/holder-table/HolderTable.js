import React, { useState, useEffect } from "react";
import { truncateStr } from "../../common/helpers/TruncateStr";
// import { store } from "../../common/store";
import Label from "../label/label";
import ViewDidDialog from "../view-did-dialog/ViewDidDIalog";

const HolderTable = () => {
  let storeChangeSubscription;
  // const storeState = store.getState();
  const [viewDialogOpenned, setViewDialogOpenned] = useState(false);
  const [considerVpRequest, setConsiderVpRequest] = useState(null);
  // console.log(storeState.holder.requests);
  const [list, setList] = useState([]);
  useEffect(() => {
    // this.storeChangeSubscription = store.subscribe(() => {
    //     const storeState = store.getState();
    //     setList(storeState.holder.requests);
    // });
    // //will unmount
    // this.storeChangeSubscription && this.storeChangeSubscription();
    // this.storeChangeSubscription = null;
  }, []);

  const toggleDidDialog = (viewDialogOpenned) => {
    setViewDialogOpenned(viewDialogOpenned);
  };
  const onConsiderButtonClick = (vpRequest) => {
    //A VERIFIER
    setConsiderVpRequest(vpRequest);
  };

  const onViewDidDialogClose = () => {
    setConsiderVpRequest(null);
  };
  return (
    <>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">Requester</th>
            <th scope="col">Description</th>
            <th scope="col">VC ID</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item, index) => {
              return (
                <tr key={"row-" + index}>
                  <th>
                    {!item.status && (
                      <Label name="Pending" color="second"></Label>
                    )}
                    {item.status === 1 && (
                      <Label name="Approved" color="success"></Label>
                    )}
                    {item.status === 2 && (
                      <Label name="Rejected" color="danger"></Label>
                    )}
                  </th>
                  <td>{truncateStr(item.iss, 27)}</td>
                  <td>-</td>
                  <td>{truncateStr(item.ipfsHash)}</td>
                  <td>
                    <button
                      className="button primary button-sm me-2 float-end"
                      onClick={onConsiderButtonClick(item)}
                    >
                      Consider
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {!!considerVpRequest && (
        <ViewDidDialog
          vpRequest={considerVpRequest}
          onClose={onViewDidDialogClose}
        ></ViewDidDialog>
      )}
    </>
  );
};

export default HolderTable;
