const mongoose = require('mongoose');

const ProfileScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    work:{
        type: String
    },
    links:{
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        facebook:{
            type:String
        },
        instagram:{
            type:String
        }
    },
    location:{
        type: String
    },
    hobbies:{
        type:[String],
        required: true
    },
    bio:{
        type: String
    }
});

module.exports = Profile = mongoose.model('profile',ProfileScheme);