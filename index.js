var port = process.env.PORT || 3000

const manifest = require('./persistence/controllers/manifest-dao');
const meta = require('./persistence/controllers/meta-dao');
const stream = require('./persistence/controllers/stream-dao');

const getRouter = require('./persistence/router');
const serveHTTP = require('./serveHTTP');
const { addonBuilder } = require('stremio-addon-sdk');

const addon = new addonBuilder(manifest.get())

addon.defineStreamHandler((args) => {
    if (args.id.startsWith('br')) {
        return Promise.resolve({ streams: stream.getByMetaId(args.id) });
    } else {
        return Promise.resolve({ streams: [] });
    }
})

/*
addon.defineMetaHandler((args) => {
    return new Promise((resolve, reject) => {
        if (args.type == 'movie' && args.id.startsWith('br')) {
            resolve({ meta: catalogs.map((c) => { return c.id == args.id ? c : [] }) });
        }
    })
})
*/

addon.defineCatalogHandler((args) => {
    return new Promise((resolve, reject) => {
        if (args.extra.search) {
            resolve({ metas: meta.getAll() });
        } else if (args.type == 'movie') {
            resolve({ metas: meta.getByCatalogId(args.id) });
        } else {
            reject(new Error('Invalid Catalog Request'));
        }
    })
})

serveHTTP(addon.getInterface(), { port, getRouter });