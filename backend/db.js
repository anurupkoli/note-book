const mongoose = require('mongoose');
const mongooseURI = "mongodb://127.0.0.1/NoteBookApp";

const createMongoServer = ()=>{
    mongoose.connect(mongooseURI, {useNewUrlParser: true})
    console.log("Connected to Mongo")
}
module.exports = createMongoServer;