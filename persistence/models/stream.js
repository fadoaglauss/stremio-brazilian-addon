var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StreamSchema = new Schema({
    metaId: {
        type: 'String',
        required: true
    },
    type: {
        type: 'String',
        required: false
    },
    title: {
        type: 'String',
        required: false
    },
    infoHash: {
        type: 'String',
        required: true
    },
    sources: {
        type: ['String'],
        required: false
    }
});

module.exports = mongoose.model('Stream', StreamSchema);