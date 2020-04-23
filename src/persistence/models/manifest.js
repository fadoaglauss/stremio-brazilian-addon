var mongoose = require('mongoose');
const CatalogSchema = require("./catalog").CatalogSchema

const Schema = mongoose.Schema;

const ManifestSchema = new Schema({
    id: {
        type: 'String',
        required: true,
    },
    name: {
        type: 'String',
        required: true,
    },
    version: {
        type: 'String',
        required: true,
    },
    description: {
        type: 'String',
        required: true,
    },
    resources: {
        type: ['String'],
        required: true,
    },
    types: {
        type: ['String'],
        required: true,
    },
    catalogs: {
        type: [CatalogSchema],
        ref: 'Catalog',
        required: true,
    },
    idPrefixes: {
        type: ['String'],
        required: true,
    },
});

const Manifest = mongoose.model('Manifest', ManifestSchema);

module.exports = Manifest
module.exports.ManifestSchema = ManifestSchema