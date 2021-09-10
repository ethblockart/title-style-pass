// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === 'hardhat') {
    console.warn(
      'You are trying to deploy a contract to the Hardhat Network, which' +
        'gets automatically created and destroyed every time. Use the Hardhat' +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    'Deploying the contracts with the account:',
    await deployer.getAddress()
  );

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const TSP = await ethers.getContractFactory('TitleStylePass');
  const _tsp = await TSP.deploy(
    '0x3e6bef9003eE67bbAd531bc99Fc59AeCF5AcD4F0',
    '0x3e6bef9003eE67bbAd531bc99Fc59AeCF5AcD4F0',
    '0xf57439B481B5cf40FEDD0550936dE7d8392fa6f2'
  );
  await _tsp.deployed();

  console.log('_tsp address:', _tsp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
