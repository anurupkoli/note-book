import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = 'http://localhost:8000'
    const iNotes = []
    const [notes, setNotes] = useState(iNotes);
    const [success, setsuccess] = useState(null);

    const fetchNotes = async ()=>{
      const response = await fetch(`${host}/api/note/getNotes`, {
        method: "GET", 
        headers: {
          "Content-type": "application/json",
          "user-token": localStorage.getItem('token')
        }, 
      }) 
      const json = await response.json();
      if(!json.note){
        setNotes(iNotes)
      }
      setNotes(json.note);
    }


    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/note/addNote`, {
          method: "POST", 
          headers: {
            "Content-type": "application/json",
            "user-token": localStorage.getItem('token')
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
          "user-token": localStorage.getItem('token')
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
          "user-token": localStorage.getItem('token')
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
            {props.children}S
        </NoteContext.Provider>
    )
}

export default NoteState;