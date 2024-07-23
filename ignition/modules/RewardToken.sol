const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RewardTokenModule", (m) => {
  // Log the start of the deployment process
  console.log("Starting deployment of RewardToken...");

  // Get the deployer account
  const deployer = m.getAccount(0);

  // Log the deployer's address for transparency
  console.log(`Deployer address: ${deployer}`);

  try {
    // Deploy the RewardToken contract
    const rewardToken = m.contract("RewardToken", [], {
      from: deployer,
    });

    // Log the deployment address
    rewardToken.then(instance => {
      console.log(`RewardToken deployed at address: ${instance.options.address}`);
    });

    // Return the deployed contract instance
    return { rewardToken };
  } catch (error) {
    // Log any errors encountered during deployment
    console.error("Error deploying RewardToken:", error);
    throw error; // Re-throw the error to ensure the deployment fails
  }
});