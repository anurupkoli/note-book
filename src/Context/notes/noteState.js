import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props)=>{
    const state = {
        "name": "Anurup", 
        "class": "5th Sem 'E'"
    }
    
    return(
        <NoteContext.Provider value={state} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;