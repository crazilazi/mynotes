import React, { useState, useContext, useEffect } from 'react';
import { Context, ComponentAction, types } from '../../store/store';
import LazyLoader from '../../spinner/components';

const AddNote: React.FC = (props) => {
    // state
    const [notes, setNote] = useState('');
    const [title, setTitle] = useState('');
    const { state, dispatch } = useContext(Context);
    const [isPageLoading, setIsPageLoading] = useState(false);
    useEffect(() => {
        console.log(state);
        let action: ComponentAction = {
            type: types.MENUSTATE,
            payload: { isMenuOpen: false }
        }

        // dispatch action to store
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(action);
    }, []);

    const onChangeNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const addNote = async () => {
        let ethereum = window.ethereum;
        const selectedAddress = ethereum.selectedAddress;
        let keep = state.smartContract;
        setIsPageLoading(true);
        await keep.methods.saveNote(notes, title, Date.now()).send({ from: selectedAddress })
            .once('receipt', (receipt: any) => {
                setNote('');
                setTitle('');
                setIsPageLoading(false);
            })

    }
    return (
        <React.Fragment>
            <LazyLoader IsLoading={isPageLoading}></LazyLoader>
            <div className="row">
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
            </div>
        </React.Fragment>
    );
};

export default AddNote;