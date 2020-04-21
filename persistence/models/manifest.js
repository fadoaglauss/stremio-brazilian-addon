var { mongoose } = require('./config');
const Schema = mongoose.Schema;

const ManifestSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    resources: {
        type: [String],
        required: true,
    },
    types: {
        type: [String],
        required: true,
    },
    catalogs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Catalog',
        required: true,
    },
    idPrefixes: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('Manifest', ManifestSchema);