import React, { useEffect } from 'react';
import './login.css';
import Web3 from 'web3';
const Login: React.FC = (props) => {

    // useEffect(() => {
    //     loadWeb3();
    // });
    const loadWeb3 = async () => {
        let ethereum = window.ethereum;
        if (!ethereum || !ethereum.isMetaMask) {
            console.error('Please install MetaMask.');
            throw new Error('Please install MetaMask.');
        }

        try {
            const accounts = await ethereum.send('eth_requestAccounts')
            console.log('ether accounts', accounts);
            // You now have an array of accounts!
            // Currently only ever one:
            // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']

        } catch (error) {
            if (error.code === 4001) { // EIP 1193 userRejectedRequest error
                console.log('Please connect to MetaMask.')
            } else {
                console.error(error)
            }
        }

        ethereum.on('accountsChanged', function (accounts: any) {
            // Time to reload your interface with accounts[0]!
            console.log('ether account changed', accounts);
        });

        ethereum.on('chainChanged', function (chainId: any) {
            // Time to make sure your any calls are directed to the correct chain!
            console.log('ether chainId', chainId);
        });

    }

    return (
        // <h1>Login</h1>
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign In</h5>
                        <form className="form-signin">
                            <div className="form-label-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                                <label htmlFor="inputEmail">Email address</label>
                            </div>

                            <div className="form-label-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                <label htmlFor="inputPassword">Password</label>
                            </div>

                            <div className="custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={() => loadWeb3()} type="button">Sign in</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;