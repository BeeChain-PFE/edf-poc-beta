const MetaMask = require('@/lib/MetaMask');

class IERC20 {
  constructor(address) {
    const ierc20Data = require('@/fudge/build/contracts/IERC20.json');

    this.abi = ierc20Data.abi;
    this.address = address;
    this.web3 = MetaMask.web3;

    this.contract = new this.web3.eth.Contract(this.abi, this.address);
  }

  getTokenInformation() {
    const promises = [];

    promises.push(this.getName()); // 0
    promises.push(this.getSymbol()); // 1

    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then((results) => {
          resolve({
            name: results[0],
            symbol: results[1],
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getName() {
    return Promise.resolve("tokenName");
  }

  getSymbol() {
    return Promise.resolve("tokenSymbol");
  }

  getBalanceOf(address) {
    return Promise.resolve(0);
  }
}

module.exports = IERC20;