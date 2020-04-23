var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExtraSchema = Schema({
    name: {
        type: 'String',
    },
    isRequired: {
        type: 'String',
    },
    options: {
        type: 'String',
    },
    optionsLimit: {
        type: 'String'
    }
});

const Extra = mongoose.model('Extra', ExtraSchema);

module.exports = Extra
module.exports.ExtraSchema = ExtraSchema
