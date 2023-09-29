import React, {useContext} from "react";
import noteContext from "../Context/notes/noteContext";


export default function NoteItem(props) {
  let context = useContext(noteContext);
  // Destructing required data from noteContext
  let {deleteNote, success} = context;
  const { note, fireModal, fireAlert} = props;
  
  // Firing alert when clicked on delete option
  const alert = ()=>{
    if(success === true){
      fireAlert('success', 'Note has been deleted :)')
    }
    else{
      props.fireAlert('danger', 'We could not delete the note :(')
    }
  }
  return (
    <div className="col-md-3">
      <div className="card my-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-end">
          <span className="material-symbols-outlined" onClick={()=>{deleteNote(note._id); alert()}}>delete</span>
          <span className="material-symbols-outlined" onClick={()=>{fireModal(note)}} >edit</span>
          </div>
          <h5 className="card-title">Title: {note.title}</h5>
          <p className="card-text">Description: {note.description}</p>
        </div>
      </div>
    </div>
  );
}
