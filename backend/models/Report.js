const mongoose = require('mongoose');

const DiplomReportSchema = mongoose.Schema({

    "userId": {
        type: String,
        required: true,
    },
    "text": {
        type: String,
        required: true,
    }
})

const Report = mongoose.model('report', DiplomReportSchema);

module.exports = Report