const Catalog = require('../models/catalog')

const CatalogDao = {
    getAll: async () => await Catalog.find().exec(),
    getById: async (id) => await Catalog.find({ id }).exec(),
    add: async (catalog) => await (new Catalog(catalog)).save()
}
module.exports = CatalogDao