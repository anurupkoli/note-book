import React from "react";

export default function NoteItem(props) {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-end">
          <span className="material-symbols-outlined">delete</span>
          <span className="material-symbols-outlined">edit</span>
          </div>
          <h5 className="card-title">Title: {note.title}</h5>
          <p className="card-text">Description: {note.description}</p>
        </div>
      </div>
    </div>
  );
}
