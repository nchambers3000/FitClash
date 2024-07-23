'use client';
import { useState } from 'react';
import { useMetamask, useBalance } from '../hooks/useMetamask';
import { getContract } from '../lib/web3';
import styled from 'styled-components';

// Replace with your deployed contract's ABI
const rewardTokenAbi = [
  // Your contract ABI goes here
];
const rewardTokenAddress = process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS;

const rewardTokenContract = getContract(rewardTokenAbi, rewardTokenAddress);

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
        alert('Failed to mint token. Please try again.');
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
    <Container>
      <Title>Web3 Reward System</Title>
      <InputContainer>
        <Input
          type="text"
          placeholder="Enter Address"
          value={address}
          readOnly
        />
        {isLoadingAddress && <LoadingMessage>Connecting to Metamask...</LoadingMessage>}
      </InputContainer>
      <Button onClick={fetchBalance} disabled={isLoadingBalance || !address}>
        {isLoadingBalance ? 'Fetching Balance...' : 'Get Balance'}
      </Button>
      {balance && (
        <BalanceMessage>The balance of {address} is: {balance} ETH</BalanceMessage>
      )}
      <Button onClick={handleCompleteJump}>
        Complete Star Jump
      </Button>
      <MilestoneMessage>Star Jumps Completed: {milestone}</MilestoneMessage>
      <Button onClick={handleMintToken} disabled={isMinting || !address}>
        {isMinting ? 'Minting Token...' : 'Mint Token'}
      </Button>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-right: 10px;
  color: black;
`;

const LoadingMessage = styled.span`
  color: grey;
`;

const Button = styled.button`
  margin-bottom: 20px;
`;

const BalanceMessage = styled.p`
  margin-bottom: 20px;
`;

const MilestoneMessage = styled.p`
  margin-bottom: 20px;
`;