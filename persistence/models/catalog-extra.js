var { mongoose } = require('./config');
const Schema = mongoose.Schema;

const ExtraSchema = new Schema({
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