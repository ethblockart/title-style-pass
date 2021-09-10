require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');

const pk = '';
const RINPK2 = '';
module.exports = {
  // solidity: '0.7.3',
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: 'DYAH2X4T7YQM14EE8R6X4SJCJRWXG9V9RF',
  },
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/eUPiqatfspumnJP7GuKwHwEZJUBtx-oC',
      },
    },
    local: {
      url: 'http://127.0.0.1:8545',
      // chainId: 1,
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/eUPiqatfspumnJP7GuKwHwEZJUBtx-oC',
      },
    },
    mainnet: {
      chainId: 1,
      url: `https://eth-mainnet.alchemyapi.io/v2/eUPiqatfspumnJP7GuKwHwEZJUBtx-oC`,
      accounts: [`0x${pk}`],
    },

    rinkeby: {
      url: `https://rinkeby.infura.io/v3/188aef10082e4898b92cfb5a8d9cd501`,
      accounts: [`0x${RINPK2}`],
    },
  },
};
