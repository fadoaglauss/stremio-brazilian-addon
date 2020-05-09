const Stream = require('../models/stream')

class StreamDao {
    async getAll() {
        return Stream.find().exec()
    }
    async getByMetaId(metaId) {
        return Stream.find({
            metaId
        }).exec()
    }
    
    async getByMetaIdAndInfoHash(metaId, infoHash) {
        return Stream.findOne({
            metaId,
            infoHash
        }).exec()
    }

    async addIfAbsent(stream) {
        let exists = await this.getByMetaIdAndInfoHash(stream.metaId, stream.infoHash)
        if (exists != null) {
            return exists
        } else {
            return (new Stream(stream)).save()
        }
        
    }
}

module.exports = StreamDao