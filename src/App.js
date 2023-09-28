import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/noteState";
import Alert from "./Components/Alert";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState({type: "", message:""});

  const fireAlert = (type, message)=>{
    setAlert({
      type: type,
      message: message
    })
    setTimeout(() => {
      setAlert(null)
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
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
