var fs = require("fs");

var UniswapV2Router02 = artifacts.require("UniswapV2Router02");

const factory = "0x8fd2cEd4f6751FBB29186196c255C667f6636A25"; // From core
const feeToSetter = "0x24d39F8c3c38Df135Fd28078e6A2e2dCF9284FBB";
const WETH = "0x6a5786Cdd77BcD95F35978A160c5dA349CF2C0BA";
const tokenA = "0x6a5786Cdd77BcD95F35978A160c5dA349CF2C0BA";
const tokenBN = "0x6a5786Cdd77BcD95F35978A160c5dA349CF2C0BA";

const DEPLOY_NEW = true;

function wf(name, address) {
  fs.appendFileSync('.env', name + "=" + address);
  fs.appendFileSync('.env', "\r\n");
}


module.exports = async function (deployer) {
  //require('dotenv').config();
 
  if (DEPLOY_NEW) {
    await deployer.deploy(UniswapV2Router02, factory, WETH);
    var iUniswapV2Router02 = await UniswapV2Router02.deployed();
    wf("iUniswapV2Router02", iUniswapV2Router02.address);
  } else {
      //var iUniswapV2Router02 = await UniswapV2Router02.at(process.env.iUniswapV2Router02);
  }
};
