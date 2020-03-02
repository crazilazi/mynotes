import React, { Dispatch } from "react";

export interface IUser {
    isAuthenticated: boolean;
    userAddress: string | undefined;
    smartContract: any;
}
export interface IGlobalState {
    isAuthenticated?: boolean;
    userAddress?: string | undefined;
    smartContract?: any;
    isMenuOpen?: boolean;
};

export const initialState: IGlobalState = {
    isAuthenticated: false,
    userAddress: undefined,
    smartContract: undefined,
    isMenuOpen: false,
};

export const types = {
    AUTH: "AUTH",
    RESET: "RESET",
    MENUSTATE: "MENUSTATE"
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
    const inComingState = action.payload;
    switch (action.type) {
        case types.AUTH:
            return { ...state, ...inComingState };
        case types.MENUSTATE:
            const newState = { ...state, ...inComingState };
            console.log(newState);
            return newState;
        case types.RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }

};
