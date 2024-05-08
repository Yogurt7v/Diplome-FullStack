const mongoose = require('mongoose');

const DiplomBusketSchema = mongoose.Schema({

    "userId": {
        type: String,
        required: true
    },

    "delivered": {
        type: Boolean,
        required: true,
        default: false
    },
    "paid": {
        type: Boolean,
        required: true,
        default: false
    },

    "items": [
        {
            "productId": {
                type: String,
                required: true
            },
            "productName": {
                type: String,
                required: true
            },
            "quantity": {
                type: Number,
                required: true
            },
            "price": {
                type: Number,
                required: true
            }
        }
    ],
}, {timestamps: true});

const Busket = mongoose.model('busket', DiplomBusketSchema);

module.exports = Busket