async function main() {
  // Load the Hardhat environment
  const { ethers } = require("hardhat");
  const { getNamedAccounts, deployments } = hre;

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the balance of the deployer account
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance.toString()), "ETH");

  // Compile and deploy the RewardToken contract
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();

  console.log("RewardToken deployed to:", rewardToken.address);
}

// Handle errors and run the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });