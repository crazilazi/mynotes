import Web3 from 'web3';
import Keep from '../../abis/Keep.json';

class MySmartContract {
  static contract: any = undefined;
  static loggedIn: boolean = false;
  static getContract = async () => {
    if (MySmartContract.contract !== undefined) {
      return MySmartContract.contract;
    }
    let ethereum = window.ethereum;
    const accounts = await ethereum.enable();
    console.log('from contract', accounts);
    try {
      const networkData = Keep.networks[ethereum.networkVersion];
      const web3 = new Web3(ethereum);
      MySmartContract.contract = new web3.eth.Contract(Keep['abi'], networkData.address);
      return MySmartContract.contract;


    } catch (e) {
      console.error('Please login using metamask', e);
      return undefined;
    }
  };

  static login = async () => {
    let ethereum = window.ethereum;
    if (!ethereum || !ethereum.isMetaMask) {
      console.error('Please install MetaMask.');
      throw new Error('Please install MetaMask.');
    }

    try {
      // const accounts = await ethereum.send('eth_requestAccounts');
      const accounts = await ethereum.enable();
      MySmartContract.loggedIn = true;
      console.log('ether accounts', accounts);

    } catch (error) {
      MySmartContract.loggedIn = false;
      if (error.code === 4001) { // EIP 1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error)
      }
    }

    // ethereum.on('accountsChanged', function (accounts: any) {
    //     // Time to reload your interface with accounts[0]!
    //     console.log('ether account changed', accounts);
    // });

    // ethereum.on('chainChanged', function (chainId: any) {
    //     // Time to make sure your any calls are directed to the correct chain!
    //     console.log('ether chainId', chainId);
    // });
  };

}

export const mySmartContract = MySmartContract;