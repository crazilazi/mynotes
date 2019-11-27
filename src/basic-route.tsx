import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./app/home/components/home";
import SideBarMenu from "./app/menu/sidebar/components";
import Login from "./app/Auth/login/components/login";
import AddNote from "./app/notes/components/add-note";
import NotFound from "./app/notfound/components/notfound";
import ViewNote from "./app/notes/components/view-note";

let currentAccount: any = null;
const checkLogin = async () => {
    let ethereum = window.ethereum;
    if (!ethereum || !ethereum.isMetaMask) {
        return false;
    }
    const accounts = await ethereum.send('eth_requestAccounts');
    if (accounts.length === 0) {
        return false;
    }

    return false;
}
// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts: any) {

    if (accounts.length === 0) {

        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.')

    } else if (accounts[0] !== currentAccount) {

        currentAccount = accounts[0]
        // Run any other necessary logic...
    }
};

const BasicRoute: React.FC = (props) => {
    return (

        <div id="outer-container" >
            <SideBarMenu pageWrapId="page-wrap" outerContainerId="outer-container" ></SideBarMenu>
            <main id="page-wrap">
                <div className="container-fluid" style={{ 'width': '90%' }}>
                    <Router>
                        <Switch>
                            <Route exact path="/auth" component={Login} />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/note" component={ViewNote} />
                            <Route exact path="/note/Add" component={AddNote} />
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Router>
                </div>
            </main>
        </div >


    );
};

export default BasicRoute;