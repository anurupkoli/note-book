import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext'

export default function About() {
    let a = useContext(noteContext)
  return (
    <>
        <h1>This is About Page</h1>
    </>
  )
}
