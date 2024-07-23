require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition-ethers');
require('@nomiclabs/hardhat-waffle');
require('hardhat-gas-reporter');
require('dotenv').config();

const { PRIVATE_KEY, MOONBASE_URL } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    moonbase: {
      url: MOONBASE_URL,
      chainId: 1287,
      accounts: [PRIVATE_KEY],
    },
    // Add other networks if needed
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
  mocha: {
    timeout: 20000
  }
};