const {
    getRouter
} = require('stremio-addon-sdk');
const disassemble = require('./controllers/movie-assembler');
const MetaDAO = require('./controllers/meta-dao');
const StreamDAO = require('./controllers/stream-dao');


async function upsertMovieData(movie) {
    console.log('upsertMovieData in:'+movie)
    let metaDao = new MetaDAO()
    let streamDao = new StreamDAO()
    
    const {
        meta,
        streams
    } = disassemble(movie);
    console.log(meta)
    console.log(streams)
    console.log("hey")
    await metaDao.upsert(meta);
    await streams.map(m => {
        streamDao.add(m)
    });
}

function getProxyRouter(addonInterface) {
    const router = getRouter(addonInterface);

    router.post('/movie', (req, res) => {
        upsertMovieData(req.body)
            .then(() => res.send(200))
            .catch(err => res.send(err))
    });

    return router
}
module.exports = {
    upsertMovieData,
    getRouter: getProxyRouter
}