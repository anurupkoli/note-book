import React, {useState, useContext} from "react";
import Notes from "./Notes";
import noteContext from "../Context/notes/noteContext";

export default function Home(props) {
  let context = useContext(noteContext)
  let {addNote, success} = context;
  const [note, setNote] = useState({title: "", description:"", tag: "General"});

  const handleClick = async (e)=>{
    e.preventDefault();
    await addNote(note.title, note.description, note.tag);
    if(success===true){
      props.fireAlert('success', 'Note has been saved :)')
    }
    else{
      props.fireAlert('danger', 'We could not save your note :(')
    }
  }

  const handleChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container ">
        <h1 className="mt-1">SAVE A NOTE</h1>
        <form className="my-3 ">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              cols={30}
              rows={10}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick} >
            Submit
          </button>
        </form>
      </div>
      <div className="container mt-5 ">
        <h2>Your Notes</h2>
        <Notes fireAlert={props.fireAlert} />
      </div>
    </>
  );
}
