import React, { useReducer } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Home from "./app/home/components/home";
import Login from "./app/Auth/login/components/login";
import AddNote from "./app/notes/components/add-note";
import NotFound from "./app/notfound/components/notfound";
import ViewNote from "./app/notes/components/view-note";
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCartPlus, faBoxOpen, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import './menu.css';
import { reducer, initialState, Context } from "./app/store/store";
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
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            <Router>
                <Menu noOverlay={false} disableOverlayClick={false} isOpen={false} >
                    <Link className="menu-item" to="/"><FontAwesomeIcon icon={faHome} /> Home </Link>
                    <Link className="menu-item" to="/note/add"> <FontAwesomeIcon icon={faCartPlus} /> Add Notes </Link>
                    <Link className="menu-item" to="/note"><FontAwesomeIcon icon={faBoxOpen} /> View Notes </Link>
                    <Link className="menu-item" to="/Auth"><FontAwesomeIcon icon={faLockOpen} /> Log In </Link>
                </Menu>
                <div className="container-fluid" style={{ 'width': '90%' }}>
                    <Switch>
                        <Route exact path="/auth" component={Login} />
                        <Route exact path="/" render={() => state.isAuthenticated ? <Home /> : <Redirect to={{ pathname: "/auth" }} />} />
                        <Route exact path="/note" render={() => state.isAuthenticated ? <ViewNote /> : <Redirect to={{ pathname: "/auth" }} />} />
                        <Route exact path="/note/Add" render={() => state.isAuthenticated ? <AddNote /> : <Redirect to={{ pathname: "/login" }} />} />
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
            </Router >
        </Context.Provider>
    );
};

export default BasicRoute;