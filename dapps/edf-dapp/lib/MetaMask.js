// Get the Web3 object
const Web3 = require("web3");

class metaMask {
  constructor() {
    // Connect to the injected ethereum provider
    this.web3 = new Web3(window.ethereum);
  }

  getAccounts() {
    return window.ethereum.request({ method: 'eth_requestAccounts' });
  }
}

const MetaMask = new metaMask();
module.exports = MetaMask;