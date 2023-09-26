import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const iNotes = [
        {
          "_id": "651042943178713sdfga64232688588a",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-24T14:07:16.828Z",
          "__v": 0
        },
        {
          "_id": "65110a6d0ee97889aegaacd8cfd8a6b576",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-25T04:19:57.714Z",
          "__v": 0
        },
        {
          "_id": "65110a6d563540eeksftg9ser8cfd8a6b576",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-25T04:19:57.714Z",
          "__v": 0
        },
        {
          "_id": "65110a6d0ee9dasdfqq28cfd8a6b576",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-25T04:19:57.714Z",
          "__v": 0
        },
      ]

      const [notes, setNotes] = useState(iNotes);

    const addNote = (title, description, tag)=>{
        let note = {
            "title": title,
            "description": description,
            "tag": tag,
            "_id": "132785-091823541",
            "date": "2023-09-25T04:19:57.714Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    const deleteNote = ()=>{

    }

    const editNote = ()=>{

    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;