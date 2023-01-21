const MetaMask = require('@/lib/MetaMask');

class TracabiliteSmc {
  constructor(address) {
    const smartcontract = require('../src/abi/Tracabilite.json');

    this.abi = smartcontract.abi;
    this.address = address;
    this.web3 = MetaMask.web3;

    this.contract = new this.web3.eth.Contract(this.abi, this.address);
  }
  
}