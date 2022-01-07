const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const {check, validationResult} = require("express-validator");

//@route GET api/profile
//@description test route for now
//@access Public

router.get('/',(req,res)=>{
    res.send('profile route');
});

//@route GET api/profile/me
//@description Get current user's profile
//@access Private

router.get('/me', auth, async (req,res) =>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);

        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user.'});
        }
        return res.status(200).json(profile);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//@route POST api/profile
//@description Create or update a user's profile
//@access Private

router.post('/',[
    auth,[
        check('hobbies', 'Hobbies are required').not().isEmpty()
    ],
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        work,
        location,
        hobbies,
        bio,
        youtube,
        twitter,
        facebook,
        instagram
    } = req.body;
    const profileFields ={};
    profileFields.user = req.user.id;
    if(work) profileFields.work = work;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    profileFields.hobbies = hobbies.split(',').map(skill => skill.trim());

    //create links object
    profileFields.links = {};
    if(youtube) profileFields.links.youtube = youtube;
    if(twitter) profileFields.links.twitter = twitter;
    if(facebook) profileFields.links.facebook = facebook;
    if(instagram) profileFields.links.instagram = instagram;

    try{
        let profile = await Profile.findOne({user: req.user.id});
        //update user profile
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id},{$set:profileFields},{new:true});
            return res.status(200).json({profile});
        }

        //create user profile
        profile = new Profile(profileFields);
        await profile.save();
        res.status(200).json({profile});
    }catch(err){
        console.error(err)
        res.status(500).json({msg:'Server Error'});
    }
});

//@route GET api/profile/user
//@desc Get all profiles
//@access Public

router.get('/user', async (req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.status(200).json(profiles);
    }catch(err){
        console.error(err);
        res.status(500).json({msg:'Server Error'});
    }
});

//@route GET api/profile/user/:user_id
//@desc Get a user's profiles
//@access Public

router.get('/user/:user_id',async(req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(200).json(profile);
    }catch(err){
        console.error(err);
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(500).json({msg:'Server Error'});
    }
});

//@route DELETE api/profile
//@desc delete a user's profile, user, & posts
//@access Private

router.delete('/',auth,async (req,res)=>{
    try{
        //check if user/profiles exist

        user = await User.findById(req.user.id);
        profile = await Profile.findOne({user: req.user.id});

        if(!user){
            return res.status(401).json({msg: 'User does not exist'});
        }

        await Post.deleteMany({user: req.user.id});

        //remove user
        await User.findOneAndRemove({_id:req.user.id});

        if(!profile){
            return res.status(200).json({msg: 'User deleted, profile does not exist'});
        }

        //remove profile
        await Profile.findOneAndRemove({user:req.user.id});

        res.status(200).json({msg: 'User and Profile was deleted'});
    }catch(err){
        console.error(err);
        res.status(500).json({msg:'Server Error'});
    }
});

module.exports = router;