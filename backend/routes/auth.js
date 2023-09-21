const { Schema } = require('mongoose');
const schema = require('../modles/User');
const express = require('express');
const router = express.Router();

router.post('/', (req,res)=>{
    let userSchema = new schema(req.body);
    userSchema.save();
    console.log(req.body);
    res.json(req.body);
})

module.exports = router;
