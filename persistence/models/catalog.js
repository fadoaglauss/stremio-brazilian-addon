var { mongoose } = require('../../config');

const CatalogSchema = new mongoose.Schema({
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
        type: [mongoose.ObjectId],
        ref: 'Extra',
        required: false
    }
});

module.exports = mongoose.model('Catalog', CatalogSchema);