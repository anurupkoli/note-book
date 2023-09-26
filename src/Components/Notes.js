import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  let { notes } = context;
  return (
    <div className="row my-2">
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}
    </div>
  );
}
