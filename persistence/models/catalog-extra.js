const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExtraSchema = Schema({
    name: {
        type: String,
    },
    isRequired: {
        type: String,
    },
    options: {
        type: String,
    },
    optionsLimit: {
        type: String
    }
});

module.exports = mongoose.model('Extra', ExtraSchema);