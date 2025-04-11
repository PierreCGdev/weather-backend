var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

router.post('/signup', (req,res) =>{
    if(checkBody(req.body, ["email","password"])){
        User.findOne({email: req.body.email})
        .then(data => {
            if(!data){
                const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
                })
                newUser.save().then(() =>res.json({result: true}))
            }else{
                res.json({result: false, error: 'User already exists'})
            }
        })
    }else{
        res.json({result: false, error: 'Missing or empty fields'})
    }
})

router.post('/signin', (req,res) =>{
    if(checkBody(req.body, ["email","password"])){
        User.findOne({email: req.body.email, password: req.body.password})
        .then(data => {
            if(data){
                res.json({result: true})
            }else{
                res.json({result: false, error: 'User not found'})
            }
        })
    }else{
        res.json({result: false, error: 'Missing or empty fields'})
    }
})

router.get('/', (req,res) => {
    User.find().then((data)=> res.json({data}))
})

module.exports = router;