// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DidRegistry {
    uint256 public ownerCount;
    struct Owner {
        string addressO;
        string didO;
        string nameO;
    }
    mapping(uint256 => Owner) public owners;

    uint256 public supplierCount;
    struct Supplier {
        string addressS;
        string didS;
        string nameS;
    }
    mapping(uint256 => Supplier) public suppliers;

    uint256 public laboratorieCount;
    struct Laboratory {
        string addressL;
        string didL;
        string nameL;
    }
    mapping(uint256 => Laboratory) public laboratories;

    function addOwner(
        string memory _address,
        string memory _did,
        string memory _name
    ) public {
        require(msg.sender == msg.sender, "only owner can add his did");
        owners[ownerCount] = Owner(_address, _did, _name);
        ownerCount++;
    }

    function addSupplier(
        string memory _address,
        string memory _did,
        string memory _name
    ) public {
        require(msg.sender == msg.sender, "only owner can add his did");
        suppliers[supplierCount] = Supplier(_address, _did, _name);
        supplierCount++;
    }

    function addLaboratory(
        string memory _address,
        string memory _did,
        string memory _name
    ) public {
        require(msg.sender == msg.sender, "only owner can add his did");
        laboratories[laboratorieCount] = Laboratory(_address, _did, _name);
        laboratorieCount++;
    }

    function getAllLaboratories() public view returns (Laboratory[] memory) {
        Laboratory[] memory result = new Laboratory[](laboratorieCount);
        for (uint256 i = 0; i < laboratorieCount; i++) {
            result[i] = laboratories[i];
        }
        return result;
    }

    function getAllSuppliers() public view returns (Supplier[] memory) {
        Supplier[] memory result = new Supplier[](supplierCount);
        for (uint256 i = 0; i < supplierCount; i++) {
            result[i] = suppliers[i];
        }
        return result;
    }

    function getDataByAddress(string memory _address)
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        for (uint256 i = 0; i < ownerCount; i++) {
            if (
                keccak256(abi.encodePacked(owners[i].addressO)) ==
                keccak256(abi.encodePacked(_address))
            ) {
                return (owners[i].didO, "client", owners[i].nameO);
            }
        }
        for (uint256 i = 0; i < supplierCount; i++) {
            if (
                keccak256(abi.encodePacked(suppliers[i].addressS)) ==
                keccak256(abi.encodePacked(_address))
            ) {
                return (suppliers[i].didS, "fournisseur", suppliers[i].nameS);
            }
        }
        for (uint256 i = 0; i < laboratorieCount; i++) {
            if (
                keccak256(abi.encodePacked(laboratories[i].addressL)) ==
                keccak256(abi.encodePacked(_address))
            ) {
                return (laboratories[i].didL, "labo", laboratories[i].nameL);
            }
        }
        return ("", "", "");
    }
}
