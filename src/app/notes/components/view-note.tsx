import React, { useState, useEffect } from 'react';
import { mySmartContract } from '../../lib/getmesmartcontract';
export interface IContract {
  id: number;
  user: string;
  content: string;
  title: string;
  createdOn: number;
}
const ViewNote: React.FC = (props) => {

  const initialState: IContract[] = [];
  const [mynotes, setmynote] = useState(initialState);

  useEffect(() => {
    getNotesdata();
  }, []);

  const getNotesdata = async () => {
    let Keep = await mySmartContract.getContract();
    let noteCount = await Keep.methods.notesCount().call();
    let temp = [];
    for (var i = 1; i <= noteCount; i++) {
      const note: IContract = await Keep.methods.Notes(i).call();
      console.log(note);
      console.log(note.content);
      temp.push(note);

    }
    setmynote(temp);
    console.log(temp, 'notes');
  }
  return (
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
  )
}

export default ViewNote;