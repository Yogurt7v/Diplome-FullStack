const mongoose = require('mongoose');

const DiplomPromocodeSchema = mongoose.Schema({

    "code": {
        type: String,
        required: true,
    },
    "discount": {
        type: Number,
        required: true,
    }
})

const Promocode = mongoose.model('promocode', DiplomPromocodeSchema);

module.exports = Promocode