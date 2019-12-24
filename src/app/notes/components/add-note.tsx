import React, { useState, useContext } from 'react';
import { Context } from '../../store/store';

const AddNote: React.FC = (props) => {
    // state
    const [notes, setNote] = useState('');
    const [title, setTitle] = useState('');
    const { state, dispatch } = useContext(Context);

    const onChangeNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
        console.log(notes);
    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        console.log(title);
    }

    const addNote = async () => {
        let ethereum = window.ethereum;
        const selectedAddress = ethereum.selectedAddress;
        let keep = state.smartContract;
        await keep.methods.saveNote(notes, title, Date.now()).send({ from: selectedAddress })
            .once('receipt', (receipt: any) => {
                console.log(receipt);
                setNote('');
                setTitle('');
            })

    }
    return (
        <React.Fragment>
            <div className="col-sm-3">
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
            </div>
        </React.Fragment>
    );
};

export default AddNote;