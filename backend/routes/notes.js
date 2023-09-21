const schema = require('../modles/Notes');
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    let obj = {
        notes: "C++",
        no: 29002
    }
    res.json(obj);
})

module.exports = router;