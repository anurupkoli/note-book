import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = 'http://localhost:8000'
    const iNotes = []
    const [notes, setNotes] = useState(iNotes);
    const [success, setsuccess] = useState(false);

    const fetchNotes = async ()=>{
      const response = await fetch(`${host}/api/note/getNotes`, {
        method: "GET", 
        headers: {
          "Content-type": "application/json",
          "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGQ3MzNjZmE0MzkzZmYzNjQyOTcwIn0sImlhdCI6MTY5NTU1ODg2N30.-2k-EK529ygnaqA_NxU0Y_gx9ZU-sS0N4BdWuZeFx3o"
        }, 
      }) 
      const json = await response.json();
      setNotes(json.note);
    }


    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/note/addNote`, {
          method: "POST", 
          headers: {
            "Content-type": "application/json",
            "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGQ3MzNjZmE0MzkzZmYzNjQyOTcwIn0sImlhdCI6MTY5NTU1ODg2N30.-2k-EK529ygnaqA_NxU0Y_gx9ZU-sS0N4BdWuZeFx3o"
          },
          body: JSON.stringify({
            title: title,
            description: description,
            tag: tag
          })
        })
        const json = await response.json();
        setsuccess(json.success)
        fetchNotes();
    }


    const deleteNote = async (id)=>{
      const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGQ3MzNjZmE0MzkzZmYzNjQyOTcwIn0sImlhdCI6MTY5NTU1ODg2N30.-2k-EK529ygnaqA_NxU0Y_gx9ZU-sS0N4BdWuZeFx3o"
        }
      })
      let json = await response.json();
      setsuccess(json.success)
      fetchNotes();
    }

    const editNote = async (id, title, description, tag)=>{

      const response = await fetch(`${host}/api/note/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGQ3MzNjZmE0MzkzZmYzNjQyOTcwIn0sImlhdCI6MTY5NTU1ODg2N30.-2k-EK529ygnaqA_NxU0Y_gx9ZU-sS0N4BdWuZeFx3o"
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag
        })
      })
      
      let json = await response.json();
      setsuccess(json.success)
      fetchNotes();
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNotes, success}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;