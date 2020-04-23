const Meta = require('../models/meta')

module.exports = {
    getAll: async () => await Meta.find().exec(),
    getByCatalogId: async (catalogId) => await Meta.find().where(catalogId).in('catalogs').exec(),
    getById: async (id) => await Meta.find({ id }).exec(),
    add: async (meta) => await (new Meta(meta)).save(),
    update: async (meta) => await Meta.update({ id: meta.id }, meta).exec(),
    upsert: async (meta) => {
        var exists = await this.getById(meta.id)
        if(exists) return await this.update(meta)
        else return await this.add(meta)
    }
}