const schema = require('../modles/Notes');
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.json();
})

module.exports = router;