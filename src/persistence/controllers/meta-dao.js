const Meta = require('../models/meta')
class MetaDAO {
    async getAll(skip=0, limit=100) {
        return Meta.find().skip(skip).limit(limit).exec()
    }
    async getByGenre(catalogId, genre, skip=0, limit=100) {
        return Meta.find({ catalogs: catalogId, genres: genre }).skip(skip).limit(limit).exec()
    }
    async getByCatalogId(catalogId, skip=0, limit=100) {
        return Meta.find({ catalogs: catalogId }).skip(skip).limit(limit).exec()
    }
    async getByName(name, skip=0, limit=100) {
        return Meta.find({ name: { $regex: name, $options: 'i' } }).skip(skip).limit(limit).exec()
    }
    async getById(id) {
        return Meta.findOne({ id: id }).exec()
    }
    async add(meta) {
        return (new Meta(meta)).save()
    }
    async addIfAbsent(meta) {
        let exists = await this.getById(meta.id)
        if (exists != null) {
            return exists
        }
        else {
            return this.add(meta)
        }
    }
    async update(meta) {
        return Meta.update({ id: meta.id }, meta).exec()
    }
    async upsert(meta) {
        let exists = await this.getById(meta.id)
        if (exists != null) {
            return this.update(meta)
        }
        else {
            return this.add(meta)
        }
    }
}

module.exports = MetaDAO