import React, { useState, useEffect, useContext } from 'react';
import { Context, types, ComponentAction } from '../../store/store';
import LazyLoader from '../../spinner/components';
export interface IContract {
  id: number;
  user: string;
  content: string;
  title: string;
  createdOn: number;
}
const ViewNote: React.FC = (props) => {
  const { state, dispatch } = useContext(Context);
  const initialState: IContract[] = [];
  const [mynotes, setmynote] = useState(initialState);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    console.log(state);
    getNotesdata();
  }, []);

  const getNotesdata = async () => {
    let action: ComponentAction = {
      type: types.MENUSTATE,
      payload: { isMenuOpen: false }
    }
    // dispatch action to store
    dispatch(action);

    let Keep = state.smartContract;
    let noteCount = await Keep.methods.notesCount().call();
    let temp = [];
    for (var i = 1; i <= noteCount; i++) {
      const note: IContract = await Keep.methods.Notes(i).call();
      temp.push(note);

    }
    setmynote(temp);
    setIsPageLoading(false);
  }
  return (
    <>
      <LazyLoader IsLoading={isPageLoading}></LazyLoader>
      <div className="row">
        {
          mynotes && mynotes.map((x: IContract) =>
            <div className="col-sm-2" key={x.id} >
              <div className="card" >
                <div className="card-header">
                  {x.title}
                </div>
                <div className="card-body">
                  <p className="card-text" style={{ overflow: 'hidden', height: '125px' }}>{x.content}</p>
                </div>
              </div>
            </div>

          )
        }
      </div>
    </>
  )
}

export default ViewNote;