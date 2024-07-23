'use client';
import { useState } from 'react';
import { useMetamask, useBalance } from '../hooks/useMetamask';
import Web3 from 'web3';

// Replace with your deployed contract's ABI
const rewardTokenAbi = [
  // Your contract ABI goes here
];
// Replace with your deployed contract's address
const rewardTokenAddress = 'YOUR_CONTRACT_ADDRESS';

const providerRPC = {
  moonbase: 'https://rpc.api.moonbase.moonbeam.network',
};
const web3 = new Web3(providerRPC.moonbase);

const rewardTokenContract = new web3.eth.Contract(rewardTokenAbi, rewardTokenAddress);

export default function Home() {
  const { address, isLoading: isLoadingAddress } = useMetamask();
  const { balance, fetchBalance, isLoading: isLoadingBalance } = useBalance(address);
  const [milestone, setMilestone] = useState(0);
  const [isMinting, setIsMinting] = useState(false);

  const handleMintToken = async () => {
    if (milestone >= 5) {
      setIsMinting(true);
      try {
        const accounts = await web3.eth.getAccounts();
        await rewardTokenContract.methods.mint(address, web3.utils.toWei('1', 'ether')).send({ from: accounts[0] });
        alert('Token minted successfully!');
      } catch (error) {
        console.error("Error minting token:", error);
        alert('Failed to mint token.');
      } finally {
        setIsMinting(false);
      }
    } else {
      alert('Milestone not reached.');
    }
  };

  const handleCompleteJump = () => {
    setMilestone(milestone + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Web3 Reward System</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          readOnly
          style={{ marginRight: '10px', color: 'black' }}
        />
        {isLoadingAddress && <span>Connecting to Metamask...</span>}
      </div>
      <button onClick={fetchBalance} style={{ marginBottom: '20px' }} disabled={isLoadingBalance || !address}>
        {isLoadingBalance ? 'Fetching Balance...' : 'Get Balance'}
      </button>
      {balance && (
        <div>
          <p>The balance of {address} is: {balance} ETH</p>
        </div>
      )}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleCompleteJump} style={{ marginRight: '10px' }}>Complete Star Jump</button>
        <p>Star Jumps Completed: {milestone}</p>
      </div>
      <button onClick={handleMintToken} style={{ marginBottom: '20px' }} disabled={isMinting || !address}>
        {isMinting ? 'Minting Token...' : 'Mint Token'}
      </button>
    </div>
  );
}