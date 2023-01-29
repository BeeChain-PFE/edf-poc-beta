import Web3 from "web3";
import ProcessList from "../../abi/ProcessList.json";
const web3 = new Web3(Web3.givenProvider);

const NETWORK = "2018";
const CONTRACT_ABI_PROCESSLIST = ProcessList.abi;
const CONTRACT_ADDRESS_PROCESSLIST = ProcessList.networks[NETWORK].address;
//contrat
export const processListContract = new web3.eth.Contract(
  CONTRACT_ABI_PROCESSLIST,
  CONTRACT_ADDRESS_PROCESSLIST
);
