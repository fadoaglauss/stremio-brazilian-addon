var mongoose = require('mongoose');
const catalogDao = require('../../../src/persistence/controllers/catalog-dao')
const Catalog = require('../../../src/persistence/models/catalog')

var catalogStub = {
    type: "movie",
    id: "BrazilianCatalog",
    name: "Filmes Dublados (ptbr)",
    extra: [{
        name: "search"
    }]
}
var catalog
beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost:27017/brazilian-addon-db`)
})
afterAll(async () => {
    await mongoose.disconnect()
})
beforeEach(async () => {
    catalog = await catalogDao.add(catalogStub)
})
afterEach(async () => {
    await Catalog.deleteMany({}).exec()
})

it('Should save the object with new properties (_id and __v)', async () => {
    expect(catalog).toEqual(expect.objectContaining({
        '_id': expect.anything(),
        '__v': expect.anything(),
    }))
    expect(catalog.id).toEqual(catalogStub.id)
})

it('Should have only added values', async () => {
    var catalogs = await catalogDao.getAll()
    await expect(catalogs).toHaveLength(1)

    await catalogDao.add(catalogStub)

    catalogs = await catalogDao.getAll()
    await expect(catalogs).toHaveLength(2)
})