import globalHook, { Store } from 'use-global-hook';
import React from 'react';

// Defining your own state and associated actions is required
export interface IUser {
    isAuthenticated: boolean;
    userAddress: string | undefined;
    smartContract: any;
}
export interface IGlobalState {
    user: IUser;
};

// Associated actions are what's expected to be returned from globalHook
export interface IGlobalActions {
    setUser: (user: IUser) => void;
};

const setUser = (store: Store<IGlobalState, IGlobalActions>, user: IUser) => {
    store.setState({ user: user });
};

const initialState: IGlobalState = {
    user: {
        isAuthenticated: false,
        userAddress: undefined,
        smartContract: undefined

    }
};

// actions passed to globalHook do not need to be typed
const actions = {
    setUser
};

const useGlobal = globalHook<IGlobalState, IGlobalActions>(
    React,
    initialState,
    actions
);

export default useGlobal;

