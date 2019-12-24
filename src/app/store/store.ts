import React, { Dispatch } from "react";

export interface IUser {
    isAuthenticated: boolean;
    userAddress: string | undefined;
    smartContract: any;
}
export interface IGlobalState {
    isAuthenticated: boolean;
    userAddress: string | undefined;
    smartContract: any;
};

export const initialState: IGlobalState = {
    isAuthenticated: false,
    userAddress: undefined,
    smartContract: undefined
};

export const types = {
    AUTH: "AUTH",
    RESET: "RESET"
};

export type ComponentAction = {
    type?: string;
    payload?: IGlobalState;
}

export type AuthContextType = {
    state: IGlobalState;
    dispatch: Dispatch<ComponentAction>;
}


export const Context = React.createContext({} as AuthContextType);

export const reducer = (state: IGlobalState, action: ComponentAction) => {
    switch (action.type) {
        case types.AUTH:
            const inComingState = action.payload;
            return { ...state, ...inComingState };
        case types.RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }
};
