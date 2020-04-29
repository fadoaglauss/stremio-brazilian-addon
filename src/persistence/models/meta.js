var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetaSchema = new Schema({
    id: {
        type: 'String',
        required: true
    },
    type: {
        type: 'String',
        required: true
    },
    name: {
        type: 'String',
        required: true
    },
    genres: {
        type: ['String'],
        required: false
    },
    poster: {
        type: 'String',
        required: false
    },
    background: {
        type: 'String',
        required: false
    },
    logo: {
        type: 'String',
        required: false
    },
    description: {
        type: 'String',
        required: false
    },
    releaseInfo: {
        type: 'String',
        required: false
    },
    imdbRating: {
        type: 'Number',
        required: false
    },
    runtime: {
        type: 'String',
        required: false
    },
    catalogs: {
        type: ['String'],
        required: true
    }
});

const Meta = mongoose.model('Meta', MetaSchema);

module.exports = Meta
module.exports.MetaSchema = MetaSchema
