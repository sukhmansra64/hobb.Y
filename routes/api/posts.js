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

//@route GET api/posts/all
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

//@route DELETE api/posts/:id
//@desc Delete a post
//@access Private

router.delete('/:id', auth, async (req,res)=>{
   try{
    const post = await Post.findById(req.params.id);

    //check if post exists
    if(!post){
        return res.status(404).json({msg:'Post not found'});
    }

    //check if user id matches post user id
       if(post.user.toString()!==req.user.id){
           return res.status(401).json({msg:'User not authorized'});
       }

       await post.remove();

       res.status(200).json({msg: 'Post deleted.'});
   }catch(err){
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: 'Post not Found'});
        }
        console.error(err);
        res.status(500).json({msg: 'Server Error'});
   }
});

//@route PUT api/posts/:id
//@desc Like a post
//@access Private

router.put('/like/:id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);

        //check if post exists
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        //check if already liked
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg:'Post already liked'});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);
    }catch(err){
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: 'Post not Found'});
        }
        console.error(err);
        res.status(500).json({msg: 'Server Error'});
    }
});

//@route PUT api/posts/unlike/:id
//@desc Unlike a post
//@access Private

router.put('/unlike/:id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);

        //check if post exists
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        //check if already unliked
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg:'Post hasn\'t been liked'});
        }

        //Get index of like to be removed
        const removeIndex = post.likes.map(like=>like.user.toString().indexOf(req.user.id))

        post.likes.splice(removeIndex,1);

        await post.save();

        res.json(post.likes);
    }catch(err){
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: 'Post not Found'});
        }
        console.error(err);
        res.status(500).json({msg: 'Server Error'});
    }
});

//@route POST api/posts/comment/:id
//@desc comment on a post
//@access Private

router.post('/comment/:id',[auth,[check('text','Text is required').not().isEmpty()]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        //check if post exists
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComment);
        await post.save();

        return res.status(200).json(post.comments)
    }catch(err){
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: 'Post not Found'});
        }
        console.error(err);
        res.status(500).json({msg: 'Server Error'});
    }
});

//@route DELETE api/posts/comment/:id/:comments_id
//@desc delete a comment on a post
//@access Private

router.delete('/comment/:id/:comments_id', auth, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);

        //check if post exists
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        //pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comments_id);

        //make sure comment exists
        if(!comment){
            return res.status(404).json({msg: 'Comment doesn\'t exist.'});
        }

        //check if user id matches post user id
        if(comment.user.toString()!==req.user.id){
            return res.status(401).json({msg:'User not authorized'});
        }

        //get remove index for comment on post
        const removeIndex = post.comments.map(comment => comment.id.toString().indexOf(req.params.comments_id));

        post.comments.splice(removeIndex,1);

        await post.save();

        res.status(200).json(post.comments);
    }catch(err){
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: 'Post/comment not Found'});
        }
        console.error(err);
        res.status(500).json({msg: 'Server Error'});
    }
});



module.exports = router;