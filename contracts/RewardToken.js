const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RewardTokenModule", async (m) => {
  // Function to log messages
  const log = (message) => {
    console.log(`[RewardTokenModule] ${message}`);
  };

  try {
    // Log the start of the deployment process
    log("Starting deployment...");

    // Get the deployer account
    const deployer = await m.getAccount(0);

    // Validate the deployer account
    if (!deployer) {
      throw new Error("Deployer account not found");
    }

    log(`Deployer address: ${deployer}`);

    // Deploy the RewardToken contract
    const rewardToken = await m.contract("RewardToken", [], {
      from: deployer,
    });

    // Log the deployed contract address
    log(`RewardToken deployed at address: ${rewardToken.options.address}`);

    // Return the deployed contract instance
    return { rewardToken };
  } catch (error) {
    // Log any errors encountered during deployment
    log(`Error deploying RewardToken: ${error.message}`);
    throw error; // Re-throw the error to ensure the deployment fails
  }
});