const Catalog = require('../models/catalog')
class CatalogDAO {
    async getAll(){
        return Catalog.find().exec()
    }
    async getById(id){
        Catalog.find({ id }).exec()
    }
    async add(catalog){
        return (new Catalog(catalog)).save()
    }
}
module.exports = CatalogDAO