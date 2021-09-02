const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require("express-validator");

const User = require('../../models/User');

//@route GET api/auth
//@description Authenticate
//@access Private

router.get('/', auth, async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'Server Error'});
    }
})


//@route POST api/auth
//@description Authenticate/login a user
//@access Public

router.post('/',[
    check('email','Please include a valid email.').isEmail(),
    check('password', 'Password is required').exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
   try{
       let user = await User.findOne({email});
       if(!user){
           return res.status(400).json({errors: [{msg: 'invalid credentials.'}]});
       }
       const isMatch = await bcrypt.compare(password,user.password);
       if(!isMatch){
           return res.status(400).json({errors: [{msg: 'invalid credentials.'}]});
       }
       const payload = {
           user:{
               id:user.id
           }
       }
       jwt.sign(payload,config.get('jwtSecret'),
           {expiresIn: 3600}, (err,token)=>{
           if(err) throw err;
           res.status(200).json({token});
           });
   }catch(err){
       console.error(err.message)
       res.status(500).json({msg: 'Server Error'});
   }
});

module.exports = router;