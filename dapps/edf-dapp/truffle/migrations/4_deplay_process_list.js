const ProcessList = artifacts.require("ProcessList");

module.exports = function (deployer) {
  deployer.deploy(ProcessList);
};
