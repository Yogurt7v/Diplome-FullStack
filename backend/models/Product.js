const mongoose = require('mongoose');

const DiplomProductSchema = mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    calories:{
        type: Number,
        required: true
    },
    ingredients:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },

})

const Product = mongoose.model('product', DiplomProductSchema);

module.exports = Product