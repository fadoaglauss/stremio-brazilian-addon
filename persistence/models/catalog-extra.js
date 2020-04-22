var { mongoose } = require('../../config');

const ExtraSchema = new mongoose.Schema({
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