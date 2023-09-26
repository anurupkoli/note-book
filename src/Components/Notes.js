import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  let { notes, setNotes } = context;
  return (
    <>
      <div className="row my-2">
      {notes.map((note)=>{
        return <NoteItem note={note} />
      })}
      </div>
    </>
  );
}
