import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/noteState";
import Alert from "./Components/Alert";
import { useState } from "react";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {

  const [alert, setAlert] = useState({type: "", message:""});

  const fireAlert = (type, message)=>{
    setAlert({
      type: type,
      message: message
    })
    setTimeout(() => {
      setAlert(false)
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home fireAlert={fireAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signUp" element={<SignUp/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
