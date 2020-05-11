var mongoose = require('mongoose');
const CatalogDAO = require('../../../src/persistence/controllers/catalog-dao')
const ManifestDAO = require('../../../src/persistence/controllers/manifest-dao')
var catalogDao
var manifestDao
const Manifest = require('../../../src/persistence/models/manifest')
const Catalog = require('../../../src/persistence/models/catalog')
var catalogStub = {
    type: "movie",
    id: "BrazilianCatalog",
    name: "Filmes Dublados (ptbr)",
    genres: ["Ação", "Animação", "Aventura", "Clássico", "Comédia", "Documentário", "Drama", "Fantasia", "Ficção", "Faroeste", "Guerra", "Músicas", "Nacional", "Policial", "Romance", "Suspense", "Terror"],
    extraSupported: ["search", "genre"],
}
var manifestStub
var catalog
var origManifest, origCatalog
beforeAll(async () => {
    await require('../../../src/config')
    catalogDao = new CatalogDAO()
    manifestDao = new ManifestDAO()

    origManifest = await manifestDao.get()

    await Manifest.deleteMany({}).exec()
    await Catalog.deleteMany({}).exec()
})
afterAll(async () => {
    console.log(origManifest);
    
    await manifestDao.add(origManifest || manifestStub)

    await mongoose.disconnect()
})
beforeEach(async () => {
    catalog = await catalogDao.add(catalogStub)

    manifestStub = {
        id: "brazilian-addon",
        name: "Brazilian Addon",
        version: "0.0.1",
        description: "Stremio addon for dubbed movies in portuguese (brazil).",
        resources: ["catalog", "stream"],
        types: ["movie"],
        catalogs: [catalog.toObject()],
        idPrefixes: ["tt"]
    }

})
afterEach(async () => {
    await Manifest.deleteMany({}).exec()
    await Catalog.deleteMany({}).exec()
})

describe('When a manifest is added to db', () => {
    var manifest
    beforeEach(async () => {
        m = await manifestDao.add(manifestStub)

        manifest = await manifestDao.get()

    })
    it('should be returned by manifestDao.get', async () => {

        expect(manifest).toMatchObject({
            ...manifestStub,
            $__: expect.any(Object),
            catalogs: expect.any(Array),
            idPrefixes: expect.any(Array),
            resources: expect.any(Array),
            types: expect.any(Array)
        })
    })
    it('should contain catalog in catalogs list', async () => {
        expect(manifest.catalogs).toEqual(expect.arrayContaining([expect.objectContaining({
            id: catalogStub.id
        })]))
    })
    it('should have a complete catalogs property', async () => {
        for (const prop in catalogStub) {
            expect(manifest.catalogs[0]).toHaveProperty(prop)
        }
    })
})