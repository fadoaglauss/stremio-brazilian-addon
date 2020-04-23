var mongoose = require('mongoose')
const {
    PORT
} = require('./config')
const manifestDao = require('./persistence/controllers/manifest-dao');
const catalogDao = require('./persistence/controllers/catalog-dao');
const metaDao = require('./persistence/controllers/meta-dao');
const streamDao = require('./persistence/controllers/stream-dao');

const getRouter = require('./persistence/router');
const serveHTTP = require('./serveHTTP');
const {
    addonBuilder
} = require('stremio-addon-sdk');

mongoose.connection.once('open', async () => {
    var manifest = await manifestDao.get()

    const addon = new addonBuilder(manifest.toObject())

    addon.defineStreamHandler(async (args) => {
        if (args.id.startsWith('br')) return {
            streams: streamDao.getByMetaId(args.id)
        }
        else return {
            streams: []
        }
    })

    addon.defineCatalogHandler(async (args) => {
        if (args.extra.search) {
            return {
                metas: metaDao.getAll()
            }
        } else if (args.type == 'movie') {
            return {
                metas: metaDao.getByCatalogId(args.id)
            }
        } else {
            throw new Error('Invalid Catalog Request')
        }
    })

    await serveHTTP(addon.getInterface(), {
        port: PORT,
        getRouter
    });
})