import React, { useState, useEffect } from "react";
import { truncateStr } from "../../common/helpers/TruncateStr";
// import { store } from "../../common/store";
import Label from "../label/label";
import VerifiableCredentialsDialog from "../verifiable-credentials-dialog/verifiableCredentialDialogue";

const VerifierTable = () => {
  //   let storeChangeSubscription;
  //   const storeState = store.getState();
  const [viewDialogVpRequest, setviewDialogVpRequest] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    // this.storeChangeSubscription = store.subscribe(() => {
    //     const storeState = store.getState();
    //     this.setState(() => {
    //         return {
    //             ...this.state,
    //             list: storeState.vpRequest.list.filter(t => !!t.credentialSubject)
    //         }
    //     });
    // });
    // //unmount
    // this.storeChangeSubscription && this.storeChangeSubscription();
    // this.storeChangeSubscription = null;
  }, []);

  const onVerifiableCredentialsDialogClose = () => {
    toggleVerifiableCredentialsDialog(null);
  };

  const toggleVerifiableCredentialsDialog = (viewDialogVpRequest) => {
    setviewDialogVpRequest(viewDialogVpRequest);
  };
  const onViewButtonClick = (vpRequest) => {
    return () => {
      this.toggleVerifiableCredentialsDialog(vpRequest);
    };
  };

  return (
    <>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">Holder</th>
            <th scope="col">Description</th>
            <th scope="col">VC ID</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item, index) => {
              return (
                <tr key={"key-" + index}>
                  <th>
                    {!item.status && (
                      <Label name="Pending" color="second"></Label>
                    )}
                    {item.status == 1 && (
                      <Label name="Provided" color="success"></Label>
                    )}
                  </th>
                  <td>{truncateStr(item.holder)}</td>
                  <td>-</td>
                  <td>{truncateStr(item.ipfsHash)}</td>
                  <td>
                    {item.status == 1 && (
                      <button
                        className="button primary button-sm  float-end"
                        onClick={onViewButtonClick(item)}
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {viewDialogVpRequest && (
        <VerifiableCredentialsDialog
          vpRequest={viewDialogVpRequest}
          onClose={onVerifiableCredentialsDialogClose}
        ></VerifiableCredentialsDialog>
      )}
    </>
  );
};

export default VerifierTable;
