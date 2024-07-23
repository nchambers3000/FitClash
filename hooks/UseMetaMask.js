import { useState, useEffect } from 'react';
import { web3 } from '../lib/web3';

export const useMetamask = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const connectMetamask = async () => {
      if (window.ethereum) {
        try {
          setIsLoading(true);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAddress(accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
      }
    };

    connectMetamask();
  }, []);

  return { address, isLoading };
};

export const useBalance = (address) => {
  const [balance, setBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
      setBalance(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { balance, fetchBalance, isLoading };
};