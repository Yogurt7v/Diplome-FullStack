const mongoose = require('mongoose');

const DiplomImageSchema = mongoose.Schema({

    "url": {
        type: String,   
        required: true
    },
});


const Image = mongoose.model('image', DiplomImageSchema);

module.exports = Image