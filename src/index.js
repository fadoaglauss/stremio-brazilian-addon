var mongoose = require('mongoose')
const {
    PORT
} = require('./config')
const ManifestDAO = require('./persistence/controllers/manifest-dao');
const MetaDAO = require('./persistence/controllers/meta-dao');
const StreamDAO = require('./persistence/controllers/stream-dao');

const { getRouter } = require('./persistence/router');
const serveHTTP = require('./serveHTTP');
const {
    addonBuilder
} = require('stremio-addon-sdk');

mongoose.connection.once('open', async () => {
    let manifestDao = new ManifestDAO()
    let manifest = await manifestDao.get()

    const addon = new addonBuilder(manifest.toObject())

    addon.defineStreamHandler(async (args) => {
        let streamDao = new StreamDAO()
        if (args.id.startsWith('br')) {
            let streams = await streamDao.getByMetaId(args.id)
            return { streams }
        } else {
            return { streams: [] }
        }
    })

    addon.defineCatalogHandler(async (args) => {
        let metaDao = new MetaDAO()
        if (args.extra.search) {
            let metas = await metaDao.getAll()
            return { metas }
        } else if (args.type == 'movie') {
            let metas = await metaDao.getByCatalogId(args.id)
            return { metas }
        } else {
            throw new Error('Invalid Catalog Request')
        }
    })

    await serveHTTP(addon.getInterface(), {
        port: PORT,
        getRouter
    });
})