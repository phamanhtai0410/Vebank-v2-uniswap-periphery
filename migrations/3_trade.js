var fs = require("fs");

var UniswapV2Router02 = artifacts.require("UniswapV2Router02");
var IERC20 = artifacts.require("IERC20");

const factory = "0x8fd2cEd4f6751FBB29186196c255C667f6636A25"; // From core
const feeToSetter = "0x24d39F8c3c38Df135Fd28078e6A2e2dCF9284FBB";
const rewardAddress = "0x24d39F8c3c38Df135Fd28078e6A2e2dCF9284FBB";
const walletAddress = "0x24d39F8c3c38Df135Fd28078e6A2e2dCF9284FBB";
const walletAddressReward = "";
const WETH = "0x0000000000000000000000000000456e65726779";
const tokenAAddress = "0xe88c871CEA576DdD59FA91a744Eb6C6d5b93AB40";
const tokenBAddress = "0x0000000000000000000000000000456e65726779";

const DEPLOY_NEW = false;

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
    var iUniswapV2Router02 = await UniswapV2Router02.at("0x6159F9399B5b67ce6789E166e29dD54079DEB749");
  }

  // Approve before transfer
  var tokenA = await IERC20.at(tokenAAddress);
  var tokenB = await IERC20.at(tokenBAddress);

  await tokenA.approve(iUniswapV2Router02.address, "10000000000000000000000");
  await tokenB.approve(iUniswapV2Router02.address, "10000000000000000000000");

  console.log("Balance before swap");
  console.log("Pool token: A:", (await tokenA.balanceOf("0xd87b572e9559a62b015873be97f8ee3a10e05f60")).toString(), " B:", (await tokenB.balanceOf("0xd87b572e9559a62b015873be97f8ee3a10e05f60")).toString());
  console.log("User Token A", (await tokenA.balanceOf(walletAddress)).toString());
  console.log("User Token B", (await tokenB.balanceOf(walletAddress)).toString());

  // Add pool
  await iUniswapV2Router02.swapExactTokensForTokens("15000000000000000000", "250000000000000000", [tokenAAddress, tokenBAddress],  walletAddress, 1657176936)

  console.log("Balance after swap");
  console.log("Pool token: A:", (await tokenA.balanceOf("0xd87b572e9559a62b015873be97f8ee3a10e05f60")).toString(), " B:", (await tokenB.balanceOf("0xd87b572e9559a62b015873be97f8ee3a10e05f60")).toString());
  console.log("Token A", (await tokenA.balanceOf(walletAddress)).toString());
  console.log("Token B", (await tokenB.balanceOf(walletAddress)).toString());

  console.log("Done!!")
};
