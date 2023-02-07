// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ProcessList {
    // 8 POUR LE CLIENT
    // 4 pour le labo
    // 7  pour fournisseur
    enum ProcessState {
        Abandoned, //t1 pas validé F
        Initiated, //t1 F
        InProgress, //t1 valide
        Testing, //t2 L
        TestOK, //t2 valide L
        TestKO, //t2 pas valide L
        Sent, //t3 fournisseur client
        PVDGenerated //t4 labo client (issue vc) L
    }

    struct Process {
        uint256 id;
        string[] hashes;
        uint8 state;
        string owner;
        string laboratory;
        string supplier;
    }

    mapping(uint256 => Process) public processes;
    uint256 public processCount;

    function addProcess(
        string memory _hash,
        string memory _owner,
        string memory _supplier
    ) public {
        processCount++;
        Process storage newProcess = processes[processCount];
        newProcess.id = processCount;
        newProcess.owner = _owner;
        newProcess.supplier = _supplier;
        newProcess.hashes.push(_hash);
        newProcess.state = uint8(ProcessState.Initiated);
    }

    function getProcessData(uint256 _id)
        public
        view
        returns (
            uint256,
            string[] memory,
            ProcessState,
            string memory,
            string memory,
            string memory
        )
    {
        Process storage process = processes[_id];
        return (
            process.id,
            process.hashes,
            ProcessState(process.state),
            process.owner,
            process.laboratory,
            process.supplier
        );
    }

    function updateProcessHashes(uint256 _id, string memory _hash) public {
        Process storage process = processes[_id];
        process.hashes.push(_hash);
    }

    function updateProcessState(uint256 _id, uint8 _state) public {
        require(
            _state <= uint8(ProcessState.PVDGenerated),
            "Invalid state value"
        );
        processes[_id].state = _state;
    }

    function updateProcess(
        uint256 _id,
        uint8 _state,
        string memory _hash,
        string memory _laboratory
    ) public {
        require(
            _state <= uint8(ProcessState.PVDGenerated),
            "Invalid state value"
        );
        Process storage process = processes[_id];
        process.state = _state;
        process.hashes.push(_hash);
        process.laboratory = _laboratory;
    }

    function updateLastProcess(
        uint256 _id,
        uint8 _state,
        string memory _hash
    ) public {
        Process storage process = processes[_id];
        process.state = _state;
        process.hashes.push(_hash);
    }

    function updateProcessLaboratory(uint256 _id, string memory _laboratory)
        public
    {
        Process storage process = processes[_id];
        process.laboratory = _laboratory;
    }

    function getProcessState(uint256 _id) public view returns (uint8) {
        return (processes[_id].state);
    }

    function getProcessHashes(uint256 _id)
        public
        view
        returns (string[] memory)
    {
        return processes[_id].hashes;
    }

    function getFirstProcessHash(uint256 _id)
        public
        view
        returns (string memory)
    {
        string[] memory hashes = processes[_id].hashes;
        return hashes[0];
    }

    function getOwnerProcesses(string memory _owner)
        public
        view
        returns (Process[] memory)
    {
        uint256[] memory processIds = new uint256[](processCount);
        uint256 count = 0;
        bytes32 ownerHash = keccak256(abi.encodePacked(_owner));
        for (uint256 i = 0; i <= processCount; i++) {
            bytes32 processOwnerHash = keccak256(
                abi.encodePacked(processes[i].owner)
            );
            if (ownerHash == processOwnerHash) {
                processIds[count] = i;
                count++;
            }
        }
        Process[] memory ownerProcesses = new Process[](count);
        for (uint256 i = 0; i < count; i++) {
            ownerProcesses[i] = processes[processIds[i]];
        }
        return ownerProcesses;
    }

    function getLaboratoryProcesses(string memory _laboratory)
        public
        view
        returns (Process[] memory)
    {
        uint256[] memory processIds = new uint256[](processCount);
        uint256 count = 0;
        bytes32 laboratoryHash = keccak256(abi.encodePacked(_laboratory));
        for (uint256 i = 0; i <= processCount; i++) {
            bytes32 processlaboratoryHash = keccak256(
                abi.encodePacked(processes[i].laboratory)
            );
            if (laboratoryHash == processlaboratoryHash) {
                processIds[count] = i;
                count++;
            }
        }
        Process[] memory laboratoryProcesses = new Process[](count);
        for (uint256 i = 0; i < count; i++) {
            laboratoryProcesses[i] = processes[processIds[i]];
        }
        return laboratoryProcesses;
    }

    function getProcessCount() public view returns (uint256) {
        return (processCount);
    }

    function getSupplierProcesses(string memory _supplier)
        public
        view
        returns (Process[] memory)
    {
        uint256[] memory processIds = new uint256[](processCount);
        uint256 count = 0;
        bytes32 supplierHash = keccak256(abi.encodePacked(_supplier));
        for (uint256 i = 0; i <= processCount; i++) {
            bytes32 processsupplierHash = keccak256(
                abi.encodePacked(processes[i].supplier)
            );
            if (supplierHash == processsupplierHash) {
                processIds[count] = i;
                count++;
            }
        }
        Process[] memory supplierProcesses = new Process[](count);
        for (uint256 i = 0; i < count; i++) {
            supplierProcesses[i] = processes[processIds[i]];
        }
        return supplierProcesses;
    }
}
