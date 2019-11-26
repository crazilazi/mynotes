import React from 'react';

const Home: React.FC = (props) => {
    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">Etherium</h5>

                <p className="card-text">Welcome to the Dapps.</p>
                <a href="/note/add" className="card-link">Add Notes</a>
                <a href="/note" className="card-link">View Notes</a>
            </div>
        </div>
    )
};

export default Home;