const Stream = require('../models/stream')

module.exports = {
    getAll: () => Promise((resolve, reject) => {
        Stream
            .find()
            .then(resolve)
            .catch(reject);
    }),
    getByMetaId: (metaId) => Promise((resolve, reject) => {
        Stream
            .find({ metaId })
            .then(resolve)
            .catch(reject);
    }),
    add: (stream) => {
        const s = new Stream(stream);
        return s.save;
    },
    update: (stream) => Promise((resolve, reject) => {
        Stream
            .update({ metaId: stream.metaId }, stream)
            .then(resolve)
            .catch(reject);
    }),
    upsert: (stream) => Promise((resolve, reject) => {
        this.getByMetaId(stream.metaId)
            .then(() => {
                this
                    .update(meta)
                    .then(resolve)
                    .catch(reject)
            })
            .catch(() => resolve(this.add(stream)));
    }),
}