import React, { useEffect, useContext } from 'react';
import { ComponentAction, types, Context } from '../../store/store';
import { Jumbotron, Container } from 'react-bootstrap';

const Home: React.FC = (props) => {
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        console.log(state);
        let action: ComponentAction = {
            type: types.MENUSTATE,
            payload: { isMenuOpen: false }
        }
        // dispatch action to store
        dispatch(action);
    }, []);
    return (
        <Jumbotron fluid>
            <Container>
                <h1>Welcome to Ethereum world</h1>
                <p>
                    A small dApp running on Ethereum blockchain
          </p>
            </Container>
        </Jumbotron>
    )
};

export default Home;