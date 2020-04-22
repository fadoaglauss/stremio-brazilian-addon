var mongoose = require('mongoose');
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
        type: [mongoose.ObjectId],
        ref: 'Catalog',
        required: true,
    },
    idPrefixes: {
        type: ['String'],
        required: true,
    },
});

module.exports = mongoose.model('Manifest', ManifestSchema);