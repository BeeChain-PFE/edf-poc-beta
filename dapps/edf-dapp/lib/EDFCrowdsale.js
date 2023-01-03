const MetaMask = require('@/lib/MetaMask');

class edfCrowdsale {
  constructor() {
    const edfCrowdsaleData = require('@/fudge/build/contracts/EDFCrowdsale.json');

    this.abi = edfCrowdsaleData.abi;
    this.address = edfCrowdsaleData.deployment.address;
    this.web3 = MetaMask.web3;

    this.contract = new this.web3.eth.Contract(this.abi, this.address);
  }

  getCrowdsaleInformation() {
    const promises = [];

    promises.push(this.getTokenPrice()); // 0
    promises.push(this.getTokensSold()); // 1
    promises.push(this.getToken()); // 2

    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then((results) => {
          resolve({
            tokenPrice: results[0],
            tokensSold: results[1],
            token: results[2],
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getTokensSold() {
    return Promise.resolve(0);
  }

  getTokenPrice() {
    return Promise.resolve(0);
  }

  getToken() {
    return Promise.resolve("0x0");
  }

  buyTokens(value) {
    return Promise.reject("This method is not yet implemented");
  }
}

const EDFCrowdsale = new edfCrowdsale();
module.exports = EDFCrowdsale;