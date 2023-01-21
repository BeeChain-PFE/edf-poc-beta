import React from "react";

const ReceiptTransaction = () => {
  return (
    <div className="flex-col flex">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
          <h1 className="text-2xl font-semibold text-gray-900">
            OCI Trusted Issuers
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Proposals</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of proposals to be voted on.
              </p>
              {proposals.filter((p) => p[6] == ProposalState.IN_PROGRESS)
                .length > 0 ? (
                <div className="grid grid-flow-row-dense grid-cols-3 gap-7 py-6">
                  {proposals.map((proposal, id) => {
                    if (proposal[6] == ProposalState.IN_PROGRESS) {
                      return (
                        <ul role="list">
                          <ProposalCard
                            proposalId={id}
                            proposalType={proposal[0]}
                            proposalState={proposal[6]}
                            address={proposal[1]}
                            yeas={proposal[4]}
                            nays={proposal[5]}
                            newRate={proposal[3]}
                            newRateType={proposal[2]}
                            voteFunc={vote}
                            enforceFunc={enforceProposal}
                            currentAccount={account}
                            contract={contract}
                          />
                        </ul>
                      );
                    }
                  })}
                </div>
              ) : (
                <div className="mt-5 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <CollectionIcon className="mx-auto h-12 w-12 text-gray-400 stroke-1" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    {" "}
                    No open proposals to vote on.{" "}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <ContractSection inputType={InputTypes.ADDRESS} title={"Statekeepers"}
                           description={"A list of all the Statekeepers."}
                           buttonText="Propose Statekeeper" deleteText={"Propose Deletion"} entries={statekeepers}
                           modalTitle={"Create a proposal for a new statekeeper."}
                           modalExampleInput={"0x00000..."} modalButtonText={"Propose Address"}
                           addAction={proposeStatekeeperAddition} removeAction={proposeStatekeeperDeletion}/>
          <ContractSection inputType={InputTypes.DID} title={"Trusted Issuers"}
                           description={"A list of all Trusted Issuers"}
                           buttonText="Add Trusted Issuer" deleteText={"Delete"} entries={trustedIssuers}
                           modalTitle={"Enter a new DID of a Trusted Issuer"}
                           modalExampleInput={"did:ethr:..."} modalButtonText={"Add DID"} addAction={addTrustedIssuer}
                           removeAction={removeTrustedIssuer}/> */}
      </div>
    </div>
  );
};

export default ReceiptTransaction;
