import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const initialState = [
        {
          "_id": "65104294317871362688588a",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-24T14:07:16.828Z",
          "__v": 0
        },
        {
          "_id": "65110a6d0ee9d8cfd8a6b576",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-25T04:19:57.714Z",
          "__v": 0
        },
        {
          "_id": "65110a6d0ee9d8cfd8a6b576",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-25T04:19:57.714Z",
          "__v": 0
        },
        {
          "_id": "65110a6d0ee9d8cfd8a6b576",
          "user": "650dd733cfa4393ff3642970",
          "title": "Personal",
          "description": "To wake Up early",
          "tag": "Nothing",
          "date": "2023-09-25T04:19:57.714Z",
          "__v": 0
        },
      ]
    const [notes, setNotes] = useState(initialState);
    return(
        <NoteContext.Provider value={{notes, setNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;