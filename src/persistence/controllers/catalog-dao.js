const Catalog = require('../models/catalog')
const Extra = require('../models/catalog-extra')

const CatalogDao = {
    getAll: async () => await Catalog.find().exec(),
    getById: async (id) => await Catalog.find({ id }).exec(),
    add: async (catalog) => {
        catalog.extra = await catalog.extra.map(e => new Extra(e));   
        return await (new Catalog(catalog)).save();
    },
}
module.exports = CatalogDao