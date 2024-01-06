const MyUsdc = artifacts.require("MyUsdc");
const ReceiveUSDC = artifacts.require("ReceiveUSDC");

require('dotenv').config();
const { ADDRESS } = process.env;

module.exports = async function (deployer) {

  await deployer.deploy(MyUsdc, ADDRESS);
  await MyUsdc.deployed()

  await deployer.deploy(ReceiveUSDC, MyUsdc.address);
};