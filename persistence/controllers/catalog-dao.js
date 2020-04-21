const Catalog = require('../models/catalog')
const Extra = require('../models/catalog-extra')

module.exports = {
    getAll: () => new Promise((resolve, reject) => {
        Catalog
            .find()
            .then(resolve)
            .catch(reject);
    }),
    getById: (id) => new Promise((resolve, reject) => {
        Catalog
            .find({ id })
            .then(resolve)
            .catch(reject);
    }),
    add: (catalog) => {
        catalog.extra = catalog.extra.map(e => {
            return new Extra(e);
        });   
        
        const c = new Catalog(catalog);
        return c.save();
    },
}