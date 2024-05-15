const mongoose = require('mongoose')

const DiplomSessionSchema = mongoose.Schema({

    "hash": {
        type: String,
        required: true
    },

    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

    
},{timestamps: true});




const Session = mongoose.model('session', DiplomSessionSchema);

module.exports = Session