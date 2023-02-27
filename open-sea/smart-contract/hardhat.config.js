require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({
  path: "/home/leejaelee/Documents/jforce-fresher-blc/open-sea/smart-contract/.env",
});
require("@nomiclabs/hardhat-ethers");
require("./scripts/deploy.js");
require("./scripts/mint.js");
const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    matic: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
  },
};
