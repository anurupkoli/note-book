import React, {useState, useContext} from "react";
import Notes from "./Notes";
import noteContext from "../Context/notes/noteContext";

export default function Home(props) {
  let context = useContext(noteContext)
  // Destructring required data from noteContext
  let {addNote, success} = context;
  const [note, setNote] = useState({title: "", description:"", tag: "General"});

  // Method to add Note if clicked on submit button
  const handleClick = async (e)=>{
    // prevents reloading of page
    e.preventDefault();
    await addNote(note.title, note.description, note.tag);
    // checks for loading alert
    if(success===true){
      props.fireAlert('success', 'Note has been saved :)')
    }
    else{
      props.fireAlert('danger', 'We could not save your note :(')
    }
  }

  // method to sense changes that occur in input tag
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

      {/* Prop drilling :) could have created another context for alert but that's fine for now */}
      <div className="container mt-5 ">
        <h2>Your Notes</h2>
        <Notes fireAlert={props.fireAlert} />
      </div>
    </>
  );
}
