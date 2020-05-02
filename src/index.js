var mongoose = require('mongoose')
const {
    PORT
} = require('./config')
const ManifestDAO = require('./persistence/controllers/manifest-dao');
const MetaDAO = require('./persistence/controllers/meta-dao');
const StreamDAO = require('./persistence/controllers/stream-dao');

const {
    getRouter
} = require('./persistence/router');
const serveHTTP = require('./serveHTTP');
const {
    addonBuilder, publishToCentral
} = require('stremio-addon-sdk');

mongoose.connection.once('open', () => {
    let manifestDao = new ManifestDAO()
    manifestDao.get()
        .then((manifest) => {

            const addon = new addonBuilder(manifest.toObject())

            addon.defineStreamHandler((args) => {
                let streamDao = new StreamDAO()
                if (args.id.startsWith('br')) {
                    return streamDao.getByMetaId(args.id).then((streams) => {
                        return { streams }
                    }).catch((error) => {
                        throw new Error(`Stream Handler ERROR: ${error}`)
                    })
                } else {
                    return { streams: [] }
                }

            })

            addon.defineCatalogHandler((args) => {
                let metaDao = new MetaDAO()

                if (args.extra.search) {
                    return metaDao.getByName(args.extra.search).then((metas) => {
                        return { metas }
                    }).catch((error) => {
                        throw new Error(`Catalog Handler ERROR: ${error}`)
                    })
                } else if (args.type == 'movie') {
                    return metaDao.getAll().then((metas) => {
                        return { metas }
                    }).catch((error) => {
                        throw new Error(`Catalog Handler ERROR: ${error}`)
                    })
                }
                throw new Error('Invalid Catalog Request')
            })

            publishToCentral('https://stremio-brazilian-addon.herokuapp.com/')
            
            return serveHTTP(addon.getInterface(), {
                port: PORT,
                getRouter
            }).then(({ url, server }) => {
                console.log(`Listening on ${url}`)
            }).catch((error) => {
                console.error("Couldn't start http server!")
                console.error(error)
            });
        })
        .catch((error) => {
            console.error("Something went wrong!")
            console.error(error)
        })
})