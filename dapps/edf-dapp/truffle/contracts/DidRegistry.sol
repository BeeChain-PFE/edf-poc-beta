pragma solidity ^0.8.0;

contract DidRegistry {
    // Stores
    AddressStore statekeepers;
    DIDStore trustedIssuers;
    DIDStore trustedLabo;
    DIDStore trustedFournisseurs;

    constructor() {
        statekeepers.map[msg.sender] = true;
        statekeepers.keys.push(msg.sender);
    }

    function addStatekeeper(address _statekeeperAddress) internal {
        if (!statekeepers.map[_statekeeperAddress]) {
            statekeepers.map[_statekeeperAddress] = true;
            statekeepers.keys.push(_statekeeperAddress);
        } else {
            revert("Address is already a Statekeeper!");
        }
    }

    function removeStatekeeper(address _statekeeperAddress) internal {
        if (statekeepers.map[_statekeeperAddress]) {
            delete statekeepers.map[_statekeeperAddress];
        } else {
            revert("This address is not a Statekeeper!");
        }

        int256 index = -1;
        for (uint256 i = 0; i < statekeepers.keys.length; i++) {
            if (statekeepers.keys[i] == _statekeeperAddress) {
                index = int256(i);
            }
        }

        if (index > -1) {
            // Move to be delete element to last position and then pop it out -> this prevents "gaps" in the array
            statekeepers.keys[uint256(index)] = statekeepers.keys[
                statekeepers.keys.length - 1
            ];
            statekeepers.keys.pop();
        } else {
            revert("This address is not a Statekeeper!");
        }
    }

    function getStatekeepers() public view returns (address[] memory) {
        return statekeepers.keys;
    }

    function addTrustedLabo(string memory _issuerDID) public onlyStatekeepers {
        if (!trustedLabo.map[_issuerDID]) {
            trustedLabo.map[_issuerDID] = true;
            trustedLabo.keys.push(_issuerDID);
        } else {
            revert("DID is already a Trusted Labo!");
        }
    }

    function removeTrustedLabo(string memory _issuerDID)
        public
        onlyStatekeepers
    {
        if (trustedLabo.map[_issuerDID]) {
            delete trustedLabo.map[_issuerDID];
        } else {
            revert("This DID is not a Trusted Labo!");
        }

        int256 index = -1;
        // You can't compare strings in Solidity -> compare hashes
        // https://ethereum.stackexchange.com/questions/45813/compare-strings-in-solidity
        for (uint256 i = 0; i < trustedLabo.keys.length; i++) {
            if (
                keccak256(abi.encodePacked(trustedLabo.keys[i])) ==
                keccak256(abi.encodePacked(_issuerDID))
            ) {
                index = int256(i);
            }
        }

        if (index > -1) {
            // Move to be delete element to last position and then pop it out -> this prevents "gaps" in the array
            trustedLabo.keys[uint256(index)] = trustedLabo.keys[
                trustedLabo.keys.length - 1
            ];
            trustedLabo.keys.pop();
        } else {
            revert("This DID is not a Trusted Labo!");
        }
    }

    // This will be called by verifiers to get all trusted issuer DIDs
    function getTrustedLabos() public view returns (string[] memory) {
        return trustedLabo.keys;
    }

    // This will be called by verifiers to check for a singular DID
    function isTrustedlabo(string memory _fournisseurDID)
        public
        view
        returns (bool)
    {
        return trustedLabo.map[_fournisseurDID];
    }

    function addTrustedFournisseur(string memory _fournisseurDID)
        public
        onlyStatekeepers
    {
        if (!trustedFournisseurs.map[_fournisseurDID]) {
            trustedFournisseurs.map[_fournisseurDID] = true;
            trustedFournisseurs.keys.push(_fournisseurDID);
        } else {
            revert("DID is already a Trusted Fournisseur!");
        }
    }

    function removeTrustedFournisseurs(string memory _fournisseurDID)
        public
        onlyStatekeepers
    {
        if (trustedFournisseurs.map[_fournisseurDID]) {
            delete trustedFournisseurs.map[_fournisseurDID];
        } else {
            revert("This DID is not a Trusted Fournisseur!");
        }

        int256 index = -1;
        // You can't compare strings in Solidity -> compare hashes
        // https://ethereum.stackexchange.com/questions/45813/compare-strings-in-solidity
        for (uint256 i = 0; i < trustedFournisseurs.keys.length; i++) {
            if (
                keccak256(abi.encodePacked(trustedFournisseurs.keys[i])) ==
                keccak256(abi.encodePacked(_fournisseurDID))
            ) {
                index = int256(i);
            }
        }

        if (index > -1) {
            // Move to be delete element to last position and then pop it out -> this prevents "gaps" in the array
            trustedFournisseurs.keys[uint256(index)] = trustedFournisseurs.keys[
                trustedFournisseurs.keys.length - 1
            ];
            trustedFournisseurs.keys.pop();
        } else {
            revert("This DID is not a Trusted Fournisseur!");
        }
    }

    // This will be called by verifiers to get all trusted issuer DIDs
    function getTrustedFournisseurs() public view returns (string[] memory) {
        return trustedFournisseurs.keys;
    }

    // This will be called by verifiers to check for a singular DID
    function isTrustedFournisseur(string memory _fournisseurDID)
        public
        view
        returns (bool)
    {
        return trustedFournisseurs.map[_fournisseurDID];
    }

    // This removes all bytecode from the contract address
    function killContract() internal {
        selfdestruct(payable(msg.sender));
    }

    // Structs and Enums

    enum State {
        ACCEPTED,
        REJECTED,
        IN_PROGRESS
    }
    enum StoreTypes {
        STATEKEEPERS,
        TRUSTEDISSUERS
    }

    // We can't get all keys of a map in Solidity -> we use it together with an array to get all keys
    struct AddressStore {
        mapping(address => bool) map;
        address[] keys;
    }

    // We can't get all keys of a map in Solidity -> we use it together with an array to get all keys
    struct DIDStore {
        mapping(string => bool) map; // We store string to support every type of DID. Only did:ethr? -> address type sufficient
        mapping(string => string) names;
        string[] keys;
    }

    // Modifiers/ Middleware

    modifier onlyStatekeepers() {
        require(
            statekeepers.map[msg.sender] == true,
            "Caller is not a statekeeper"
        );
        _;
    }
}
