var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CatalogSchema = new Schema({
    id: {
        type: 'String',
        required: true
    },
    type: {
        type: 'String',
        required: true,
    },
    name: {
        type: 'String',
        required: true,
    },
    extra: [{
        name: {
            type: 'String',
            required: true
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
    }]
});
const Catalog = mongoose.model('Catalog', CatalogSchema);

module.exports = Catalog
module.exports.CatalogSchema = CatalogSchema
