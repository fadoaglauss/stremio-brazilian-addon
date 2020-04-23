const Stream = require('../models/stream')

module.exports = {
    getAll: async () => await Stream.find().exec(),
    getByMetaId: async (metaId) => await Stream.find({ metaId }).exec(),
    add: async (stream) => await (new Stream(stream)).save(),
    update: async (stream) => await Stream.update({ metaId: stream.metaId }, stream).exec(),
    upsert: async (stream) => {
        var exists = await this.getByMetaId(stream.metaId)
        if(exists) return await this.update(stream)
        else return await this.add(stream)
    }
}