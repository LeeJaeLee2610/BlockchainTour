require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: "RSIANNSCNDTE71VF3NBRMB1K6HC2BHCPM6",
  },
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/4jL3BtZd1dbfzUJN1KqQ5TvGU3rUBVHv",
      accounts: [
        "3457d6119dd9ebe8d33c894189b4184abf43291a1fc2fa236dfc5eeac4d5d1b9",
      ],
    },
  },
  // solidity: "0.8.17",
  // defaultNetwork: "mumbai",
  // networks: {
  //   hardhat: {},
  //   mumbai: {
  //     url: "https://polygon-mumbai.g.alchemy.com/v2/Ahm3F5lJhKcfDmcUWtBEH8Kdw8eM-9PH",
  //     accounts: [
  //       "3457d6119dd9ebe8d33c894189b4184abf43291a1fc2fa236dfc5eeac4d5d1b9",
  //     ],
  //   },
  // },
  // etherscan: {
  //   apiKey: {
  //     polygonMumbai: "DEUN55VVCEW8VPX2ZX16NF3JC217YNBHDI",
  //   },
  // },
};
