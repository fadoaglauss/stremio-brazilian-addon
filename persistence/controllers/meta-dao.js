const Meta = require('../models/meta')

module.exports = {
    getAll: () => new Promise((resolve, reject) => {
        Meta
            .find()
            .then(resolve)
            .catch(reject);
    }),
    getByCatalogId: (catalogId) => new Promise((resolve, reject) => {
        Meta
            .find().where(catalogId).in('catalogs')
            .then(resolve)
            .catch(reject);
    }),
    getById: (id) => new Promise((resolve, reject) => {
        Meta
            .find({ id })
            .then(resolve)
            .catch(reject);
    }),
    add: (meta) => {
        const m = new Meta(meta);
        return m.save();
    },
    update: (meta) => new Promise((resolve, reject) => {
        Meta
            .update({ id: meta.id }, meta)
            .then(resolve)
            .catch(reject);
    }),
    upsert: (meta) => new Promise((resolve, reject) => {
        this.getById(meta.id)
            .then(() => {
                this
                    .update(meta)
                    .then(resolve)
                    .catch(reject)
            })
            .catch(() => resolve(this.add(meta)));
    }),
}