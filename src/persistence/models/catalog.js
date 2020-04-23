var mongoose = require('mongoose');
const ExtraSchema = require('./catalog-extra').ExtraSchema

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
    extra: {
        type: [ExtraSchema],
        ref: 'Extra',
        required: false
    }
});
const Catalog = mongoose.model('Catalog', CatalogSchema);

module.exports = Catalog
module.exports.CatalogSchema = CatalogSchema
