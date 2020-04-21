const Streams = require('../models/streams')

module.exports = {
    getAll: () => Promise((resolve, reject) => {
        Streams
            .find()
            .then(resolve)
            .catch(reject);
    }),
    getByMetaId: (metaId) => Promise((resolve, reject) => {
        Streams
            .find({ metaId })
            .then(resolve)
            .catch(reject);
    }),
    add: (streams) => {
        const s = new Streams(streams);
        return s.save;
    },
    update: (streams) => Promise((resolve, reject) => {
        Streams
            .update({ metaId: streams.metaId }, streams)
            .then(resolve)
            .catch(reject);
    }),
    upsert: (streams) => Promise((resolve, reject) => {
        this.getByMetaId(streams.metaId)
            .then(() => {
                this
                    .update(meta)
                    .then(resolve)
                    .catch(reject)
            })
            .catch(() => resolve(this.add(streams)));
    }),
}