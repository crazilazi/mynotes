import React from 'react';

const AddNote: React.FC = (props) => {
    return (
        <React.Fragment>
            <div className="col-sm-12">
                <div className="form-group">
                    <textarea className="form-control" rows={5} id="comment"></textarea>
                </div>
            </div>
            <div className="col-sm-12">
                <button type="button" className="btn btn-primary float-right">Add Notes</button>
            </div>
        </React.Fragment>
    );
};

export default AddNote;