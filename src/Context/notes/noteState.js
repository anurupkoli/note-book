import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = 'http://localhost:8000'
    const iNotes = []
    const [notes, setNotes] = useState(iNotes);

    const fetchNotes = async ()=>{
      const response = await fetch(`${host}/api/note/getNotes`, {
        method: "GET", 
        headers: {
          "Content-type": "application/json",
          "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGQ3MzNjZmE0MzkzZmYzNjQyOTcwIn0sImlhdCI6MTY5NTU1ODg2N30.-2k-EK529ygnaqA_NxU0Y_gx9ZU-sS0N4BdWuZeFx3o"
        },
        
      }) 
      response.json().then(data =>{setNotes(data)})
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
        fetchNotes();
        response.json().then(data=>{console.log(data)}) 
    }

    const deleteNote = async (id)=>{

      const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGQ3MzNjZmE0MzkzZmYzNjQyOTcwIn0sImlhdCI6MTY5NTU1ODg2N30.-2k-EK529ygnaqA_NxU0Y_gx9ZU-sS0N4BdWuZeFx3o"
        }
      })
      let json = response.json().then((data)=>{return data})
      console.log(json)
      fetchNotes();
    }

    const editNote = (id, title, description, tag)=>{
      for (let i = 0; i < notes.length; i++) {
        const ele = notes[i];
        if(ele._id === id){
          ele.title = title;
          ele.description = description;
          ele.tag = tag
        }
      }
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;