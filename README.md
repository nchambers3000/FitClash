# Web3 Reward System

This project is a Web3 application built with Hardhat and Next.js. The project includes a smart contract (`RewardToken`) deployed on the Moonbase network, and a frontend application that interacts with the smart contract using Metamask.
## Overview

The Web3 Reward System allows users to connect their Metamask wallet, complete a milestone (e.g., star jumps), and mint reward tokens upon reaching the milestone. The smart contract is deployed on the Moonbase Alpha test network.

## Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x.x)
- npm (>=6.x.x)
- Metamask (browser extension)
- Hardhat
- A Moonbase Alpha account (for deployment and testing)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/web3-reward-system.git
cd web3-reward-system


Install the dependencies:
npm install
Configuration
Create a .env file in the root directory and add the following environment variables:
PRIVATE_KEY=your_private_key_here
MOONBASE_URL=https://rpc.api.moonbase.moonbeam.network
NEXT_PUBLIC_MOONBASE_URL=https://rpc.api.moonbase.moonbeam.network
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=YOUR_CONTRACT_ADDRESS
Replace your_private_key_here with your actual private key and YOUR_CONTRACT_ADDRESS with the actual contract address after deployment.

Usage
Compile Contracts
To compile the smart contracts, run:

npm run compile
Deploy Contracts
To deploy the smart contracts to the Moonbase Alpha network, run:

npm run deploy
Run Frontend
To run the Next.js frontend application, run:

npm run dev
Open your browser and navigate to http://localhost:3000 to interact with the application.

Deployment
The deployment script is located in the scripts/ directory. To deploy the RewardToken contract, run:

npx hardhat run scripts/deploy.js --network moonbase
Testing
To run the tests for the smart contracts, run:

npm run test
Scripts
compile: Compiles the smart contracts.
test: Runs the test suite.
deploy: Deploys the smart contracts to the specified network.
coverage: Generates a test coverage report.
lint: Lints the codebase using ESLint.
format: Formats the codebase using Prettier.
dev: Runs the Next.js development server.
Project Structure
web3-reward-system/
├── contracts/
│   └── RewardToken.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── RewardToken.test.js
├── ignition/
│   └── modules/
│       └── RewardToken.js
├── hooks/
│   └── useMetamask.js
├── lib/
│   └── web3.js
├── pages/
│   └── index.js
├── public/
├── styles/
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── hardhat.config.js
├── package.json
├── README.md
contracts/: Contains the Solidity smart contracts.
scripts/: Contains deployment scripts.
test/: Contains test scripts for the smart contracts.
ignition/: Contains Ignition deployment modules.
hooks/: Contains custom React hooks.
lib/: Contains utility libraries.
pages/: Contains Next.js pages.
public/: Contains public assets.
styles/: Contains CSS styles.
.env: Environment variables.
.eslintrc.json: ESLint configuration.
.gitignore: Git ignore file.
.prettierrc: Prettier configuration.
hardhat.config.js: Hardhat configuration.
package.json: Project dependencies and scripts.
README.md: Project documentation.
License
This project is licensed under the MIT License. See the LICENSE file for more information.


### Additional Notes

1. **Replace Placeholders**: Make sure to replace placeholders like `your_private_key_here`, `YOUR_CONTRACT_ADDRESS`, and `https://github.com/your-username/web3-reward-system.git` with actual values.
2. **Detailed Documentation**: Feel free to add more sections or details as needed, such as contributing guidelines, FAQs, or detailed usage examples.

By providing a comprehensive `README.md` file, you make it easier for others to understand, set up, and use your 
