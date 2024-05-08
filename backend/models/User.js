
const mongoose = require('mongoose');

const DiplomUserSchema = mongoose.Schema({
    login:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    homeNumber:{
        type: String,
        required: true
    }, 
    flatNumber:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true

    },
    registed_at:{
        type: String,
    },
    role_id:{
        type:Number,
        default: 2
    }
}, {timestamps: true});

const User = mongoose.model('user', DiplomUserSchema);

module.exports = User

