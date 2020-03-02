import React from 'react';
import moon from './moon.svg';

export type ISpinnerProps = {
    IsLoading: boolean;
}
const LazyLoader: React.FC<ISpinnerProps> = ({ IsLoading }) => {

    return (
        <div className={IsLoading ? '' : 'd-none'} style={{
            position: "fixed",
            zIndex: 999,
            // tslint:disable-next-line:object-literal-sort-keys
            "top": 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba( 255, 255, 255, .8 )"
        }}>
            <img src={moon} style={{
                bottom: 0, left: 0, margin: "auto", position: "absolute", right: 0, "top": 0,
            }} />
        </div>
    )
}

export default LazyLoader;