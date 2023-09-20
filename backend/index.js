const mongoServer = require("./db");
const express = require("express");

mongoServer();
const app = express();
const port = 8000;

app.get('/', (req, res)=>{
    res.send("Hello world");
})

app.listen(port, ()=>{
    console.log("Connected at 8000 Port")
})


