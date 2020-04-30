const Meta = require('../models/meta')
class MetaDAO {
    async getAll() {
        return Meta.find().exec()
    }
    async getByCatalogId(catalogId) {
        return Meta.find().where(catalogId).in('catalogs').exec()
    }
    async getById(id) {
        return Meta.findOne({ id }).exec()
    }
    async add(meta) {
        return (new Meta(meta)).save()
    }
    async update(meta) {
        return Meta.update({ id: meta.id }, meta).exec()
    }
    async upsert(meta) {
        let exists = await this.getById(meta.id)
        console.log(`Upsert: ${exists}`)
        if(exists != null){
            return this.update(meta)
        }
        else {
            return this.add(meta)
        }
    }
}

module.exports = MetaDAO