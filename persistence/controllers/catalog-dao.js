const Catalog = require('../models/catalog')

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
        const c = new Catalog(catalog);
        return c.save();
    },
}