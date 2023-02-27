// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "Prints out the balance of your account").setAction(
  async function (taskArguments, hre) {
    const account = getAccount();
    console.log(account);
    console.log(
      `Account balance for ${account.address}: ${await account.getBalance()}`,
    );
  },
);

task("deploy", "Deploys the NFT.sol contract").setAction(async function (
  taskArguments,
  hre,
) {
  const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  const nft = await nftContractFactory.deploy();
  console.log(`Contract deployed to address: ${nft.address}`);
});
