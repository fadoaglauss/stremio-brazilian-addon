var { mongoose } = require('./config');
const Schema = mongoose.Schema;

const StreamDataSchema = new Schema({
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
        required: true
    }
});

const StreamsSchema = new Schema({
    metaId: {
        type: String,
        required: true
    },
    data: {
        type: [StreamDataSchema],
        required: true,
    },
});

module.exports = mongoose.model('Streams', StreamsSchema);