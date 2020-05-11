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
                return streamDao.getByMetaId(args.id).then((streams) => {
                    return { streams }
                }).catch((error) => {
                    console.error(`Stream Handler ERROR: ${error}`)
                    return { streams: [] }
                })
            })

            addon.defineCatalogHandler((args) => {

                let metaDao = new MetaDAO()
                const skip = parseInt(args.extra.skip) || 0
                const limit = 100
                if (args.extra.search) {
                    return metaDao.getByName(args.extra.search, skip, limit).then((metas) => {
                        return { metas }
                    }).catch((error) => {
                        throw new Error(`Catalog Handler ERROR: ${error}`)
                    })
                } else if (args.type == 'movie') {
                    if (args.extra.genre) {
                        return metaDao.getByGenre(args.id, args.extra.genre, skip, limit).then((metas) => {
                            return { metas }
                        }).catch((error) => {
                            throw new Error(`Catalog Handler ERROR: ${error}`)
                        })
                    }
                    return metaDao.getByCatalogId(args.id, skip, limit).then((metas) => {
                        return { metas }
                    }).catch((error) => {
                        throw new Error(`Catalog Handler ERROR: ${error}`)
                    })
                }
            })

            publishToCentral('https://stremio-brazilian-addon.herokuapp.com/manifest.json')

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