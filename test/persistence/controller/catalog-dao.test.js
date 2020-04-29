var mongoose = require('mongoose');
const CatalogDAO = require('../../../src/persistence/controllers/catalog-dao')
var catalogDao
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
    await require('../../../src/config')
    catalogDao = new CatalogDAO()
})
afterAll(async () => {
    await mongoose.disconnect()
})
beforeEach(async () => {
    catalog = await catalogDao.add(catalogStub)
})
afterEach(async () => {
    await Catalog.deleteMany().exec()
})

it('Should save the object with new properties (_id and __v)', async () => {
    expect(catalog).toEqual(expect.objectContaining({
        '_id': expect.anything(),
        '__v': expect.anything(),
    }))
    expect(catalog.id).toEqual(catalogStub.id)
})

it('Should have only added value', async () => {
    var catalogs = await catalogDao.getAll()
    await expect(catalogs).toHaveLength(1)
})
it('Should have more values if added later', async () => {
    await catalogDao.add(catalogStub)

    catalogs = await catalogDao.getAll()
    await expect(catalogs).toHaveLength(2)
})
it('Should have correct extra definitions', () => {
    expect(catalog.extra[0]).toHaveProperty("name", "search")
})