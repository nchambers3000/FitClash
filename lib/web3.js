import Web3 from 'web3';

const providerRPC = {
  moonbase: process.env.NEXT_PUBLIC_MOONBASE_URL,
};

const web3 = new Web3(providerRPC.moonbase);

const getContract = (abi, address) => {
  return new web3.eth.Contract(abi, address);
};

export { web3, getContract };