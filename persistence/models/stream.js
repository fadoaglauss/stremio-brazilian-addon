var { mongoose } = require('../../config');

const StreamSchema = new mongoose.Schema({
    metaId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    infoHash: {
        type: String,
        required: true
    },
    sources: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Stream', StreamSchema);