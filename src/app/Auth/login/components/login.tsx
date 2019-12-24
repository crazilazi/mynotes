import React, { useContext, useEffect } from 'react';
import './login.css';
import { Context, types, ComponentAction } from '../../../store/store';
import Web3 from 'web3';
import Keep from '../../../../abis/Keep.json';
import { useHistory } from 'react-router-dom';
const Login: React.FC = (props) => {
    const { state, dispatch } = useContext(Context);
    let history = useHistory();
    useEffect(() => {
        console.log(state);
    }, []);
    const login = async () => {
        console.log(state);
        let ethereum = window.ethereum;
        if (!ethereum || !ethereum.isMetaMask) {
            console.error('Please install MetaMask.');
            throw new Error('Please install MetaMask.');
        }

        try {
            // const accounts = await ethereum.send('eth_requestAccounts');
            const accounts = await ethereum.enable();
            console.log('ether accounts', accounts);
            const networkData = Keep.networks[ethereum.networkVersion];
            const web3 = new Web3(ethereum);
            let action: ComponentAction = {
                type: types.AUTH,
                payload: { isAuthenticated: true, userAddress: accounts[0], smartContract: new web3.eth.Contract(Keep['abi'], networkData.address) }
            }
            // dispatch action to store
            dispatch(action);

            history.push("");

        } catch (error) {
            if (error.code === 4001) { // EIP 1193 userRejectedRequest error
                console.log('Please connect to MetaMask.')
            } else {
                console.error(error)
            }
        }
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
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={() => login()} type="button">Sign in</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;