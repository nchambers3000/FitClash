import { useState, useEffect, useCallback } from 'react';
import { web3 } from '../lib/web3';
import { toast } from 'react-toastify';

export const useMetamask = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const connectMetamask = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not detected. Please install MetaMask to continue.');
      return;
    }

    try {
      setIsLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        toast.success(`Connected with account: ${accounts[0]}`);
      } else {
        toast.warn('No accounts found. Please connect an account to MetaMask.');
      }
    } catch (error) {
      if (error.code === 4001) {
        // User rejected request
        toast.error('User denied account access.');
      } else {
        toast.error(`Error connecting to MetaMask: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    connectMetamask();
  }, [connectMetamask]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          toast.warn('MetaMask is locked or no accounts connected.');
          setAddress('');
        } else {
          setAddress(accounts[0]);
          toast.info(`Connected account changed to: ${accounts[0]}`);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return { address, isLoading };
};

export const useBalance = (address) => {
  const [balance, setBalance] = useState('0');  // Default to '0' for better UX
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const balanceInWei = await web3.eth.getBalance(address);
      const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
      setBalance(balanceInEther);
      toast.success(`Balance fetched: ${balanceInEther} ETH`);
    } catch (error) {
      toast.error(`Error fetching balance: ${error.message}`);
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, fetchBalance, isLoading };
};
