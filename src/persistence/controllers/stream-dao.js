const Stream = require('../models/stream')

class StreamDao {
    async getAll() {
        return await Stream.find().exec()
    }
    async getByMetaId(metaId) {
        return await Stream.find({ metaId }).exec()
    }
    async add(stream) {
        return await (new Stream(stream)).save()
    }
    async update(stream) {
        return await Stream.update({ metaId: stream.metaId }, stream).exec()
    }
    async upsert(stream) {
        var exists = await this.getByMetaId(stream.metaId)
        if(exists) return await this.update(stream)
        else return await this.add(stream)
    }
}

module.exports = StreamDao