import React, { useEffect } from 'react';
import SideBarMenu from './app/menu/sidebar/components';
import { async } from 'q';
import Web3 from 'web3';

const Container: React.FC = () => {

    useEffect(() => {
        loadWeb3();
    });
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    return (
        <div id="outer-container">
            <SideBarMenu pageWrapId="page-wrap" outerContainerId="outer-container" ></SideBarMenu>
            <main className="container-fluid" id="page-wrap">

            </main>
        </div>
    )
}

export default Container;
