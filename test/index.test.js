var mongoose = require('mongoose');
const ManifestDAO = require('../src/persistence/controllers/manifest-dao')
const CatalogDAO = require('../src/persistence/controllers/catalog-dao')
var catalogDao
var manifestDao
const Manifest = require('../src/persistence/models/manifest')
const Catalog = require('../src/persistence/models/catalog')
const { addonBuilder } = require('stremio-addon-sdk');

var manifestStub
var catalog
var manifest

describe('Given a manifest retrieved by mongo db', () => {
    beforeAll(async () => {
        await require('../src/config')
        catalogDao = new CatalogDAO()
        manifestDao = new ManifestDAO()
    })
    afterAll(async () => {
        await mongoose.disconnect()
    })
    beforeEach(async () => {
        var catalogStub = {
            type: "movie",
            id: "BrazilianCatalog",
            name: "Filmes Dublados (ptbr)",
            extra: [{
                name: "search"
            }]
        }

        catalog = await catalogDao.add(catalogStub)
        
        manifestStub = {
            id: "brazilian-addon",
            name: "Brazilian Addon",
            version: "0.0.1",
            description: "Stremio addon for dubbed movies in portuguese (brazil).",
            resources: ["catalog", "stream", "meta"],
            types: ["movie"],
            catalogs: [catalog],
            idPrefixes: ["tt"]
        }

        manifest = await manifestDao.add(manifestStub)
    })
    afterEach(async () => {
        await Manifest.deleteMany({}).exec()
        await Catalog.deleteMany({}).exec()
    })
    it('Should be accepted by addonBuilder', () => {
        const addon = addonBuilder(manifest)

        return expect(addon).toEqual(expect.objectContaining({defineCatalogHandler: expect.any(Function)}))
    })
})