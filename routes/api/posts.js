const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

//import models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

//@route GET api/posts
//@description test route for now
//@access public

router.get('/',(req,res)=>{
    res.send('posts route');
});

//@route POST api/posts
//@description create a post
//@access private

router.post('/',[auth,[check('text','Text is required').not().isEmpty()]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: user._id
        });

        const post = await newPost.save();

        res.status(200).json(post);
    }catch(err){
        console.error(err);
        res.status(500).json({msg: "Server Error"});
    }
});

//@route GET api/posts
//@description get all posts
//@access private

router.get('/all',auth,async(req,res) =>{
    try{
        posts = await Post.find().sort({date: -1});

        res.status(200).json({posts});
    }catch(err){
        console.error(err);
        res.status(500).json({msg:"Server Error"});
    }
});

//@route GET api/posts/:id
//@description get post by ID
//@access private
router.get('/:id',auth, async (req,res)=>{
   try{
       const post = await Post.findById(req.params.id);

       if(!post){
           return res.status(404).json({msg: "Post not found"});
       }

       res.status(200).json(post);
   }catch(err){
       console.error(err);
       if(err.kind === 'ObjectId'){
           return res.status(404).json({msg: "Post not found"});
       }
       res.status(500).json({msg:"Server Error"});
   }
});


module.exports = router;