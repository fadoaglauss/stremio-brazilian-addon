var { mongoose } = require('./config');
const Schema = mongoose.Schema;

const Extra = new Schema({
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

})

const CatalogSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    extra: {
        type: [Extra],
        required: false
    }
});

module.exports = mongoose.model('Catalog', CatalogSchema);