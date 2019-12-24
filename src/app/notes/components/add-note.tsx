import React, { useState } from 'react';
import { mySmartContract } from '../../lib/getmesmartcontract';
import useGlobal from '../../store/global-store';
const AddNote: React.FC = (props) => {
    // state
    const [notes, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [state, actions] = useGlobal();
    const onChangeNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(state.user);
        actions.setUser({ isAuthenticated: true, userAddress: undefined, smartContract: undefined });
        setNote(event.target.value);
        console.log(notes);
    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(state.user);
        setTitle(event.target.value);
        console.log(title);
    }

    const addNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let ethereum = window.ethereum;
        const selectedAddress = ethereum.selectedAddress;
        let keep = await mySmartContract.getContract();
        await keep.methods.saveNote(notes, title, Date.now()).send({ from: selectedAddress })
            .once('receipt', (receipt: any) => {
                console.log(receipt);
                setNote('');
                setTitle('');
            })

    }

    const testAdd = (event: any) => {
        console.log(state.user);
        actions.setUser({ isAuthenticated: true, userAddress: undefined, smartContract: undefined });
        console.log(state.user);
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <form onSubmit={(event) => addNote(event)}>
                        <div className="form-group">
                            <label htmlFor="title" className="float-left">Title</label>
                            <input type="text" placeholder="title" required className="form-control" id="title" value={title} onChange={(event) => onChangeTitle(event)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment" className="float-left">Write your note</label>
                            <textarea className="form-control" required placeholder="write notes here" onChange={(event) => onChangeNote(event)} value={notes} rows={5} id="comment"></textarea>
                        </div>

                        <button type="button" onClick={(event) => testAdd(event)} className="btn btn-primary float-right" >Add Notes</button>
                    </form>
                </div>
                <div className="col-sm-2"></div>
            </div>
            {/* <div className="col-sm-3">
                <div className="form-group">
                    <input type="text" placeholder="Note title" required className="form-control" id="title" value={title} onChange={(event) => onChangeTitle(event)}></input>
                </div>
            </div>
            <div className="col-sm-12">
                <div className="form-group">
                    <textarea className="form-control" required placeholder="write notes here" onChange={(event) => onChangeNote(event)} value={notes} rows={5} id="comment"></textarea>
                </div>
            </div>
            <div className="col-sm-12">
                <button type="button" className="btn btn-primary float-right" onClick={() => addNote()}>Add Notes</button>
            </div> */}
        </React.Fragment>
    );
};

export default AddNote;