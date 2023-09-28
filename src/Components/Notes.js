import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes(props) {
  const context = useContext(noteContext);
  let { notes, fetchNotes, editNote, success } = context;
  console.log(notes)
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    eid: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fireModal = (note) => {
    ref.current.click();
    setNote({
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
      eid: note._id,
    });
  };

  const noteEdit = async () => {
    refClose.current.click();
    await editNote(note.eid, note.etitle, note.edescription, note.etag);
    if(success){
      props.fireAlert('success', 'Note has been edited :)')
    }
    else{
      props.fireAlert('danger', 'We could not edit your note:(')
    }
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3 ">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    cols={30}
                    rows={10}
                    value={note.edescription}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={noteEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {notes?(<div className="row my-2">
        {notes.map((note) => {
          return <NoteItem key={note._id} fireModal={fireModal} note={note} fireAlert={props.fireAlert} />;
        })}
      </div>):'No Notes found'}
    </>
  );
}
