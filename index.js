const getRouter = require('./router')
const serveHTTP = require('./serveHTTP')
const { addonBuilder } = require('stremio-addon-sdk')



const seedData = require('./seed')
const {
    manifest,
    catalogs,
    metas,
    streams
} = seedData()

const addon = new addonBuilder(manifest)

addon.defineStreamHandler((args) => {
    if (args.id.startsWith('br')) {
        return Promise.resolve({ streams: streams[args.id] });
    } else {
        return Promise.resolve({ streams: [] });
    }
})

addon.defineMetaHandler((args) => {
    return new Promise((resolve, reject) => {
        if (args.type == 'movie' && args.id.startsWith('br')) {
            resolve({ meta: catalogs.map((c) => { return c.id == args.id ? c : [] }) });
        }
    })
})

addon.defineCatalogHandler((args) => {
    return new Promise((resolve, reject) => {
        if (args.extra.search) {
            resolve({ metas: catalogs });
        } else if (args.type == 'movie' && args.id == 'BrazilianCatalog') {
            resolve({ metas: catalogs });
        } else {
            reject(new Error('Invalid Catalog Request'))
        }
    })
})

serveHTTP(addon.getInterface(), { port: 7032, getRouter })