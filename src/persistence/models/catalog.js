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
    genres: {
        type: ['String'],
        required: false
    },
    extraSupported: {
        type: ['String'],
        required: false
    }
});
const Catalog = mongoose.model('Catalog', CatalogSchema);

module.exports = Catalog
module.exports.CatalogSchema = CatalogSchema
