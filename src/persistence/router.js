const {
    getRouter
} = require('stremio-addon-sdk');
const disassemble = require('./controllers/movie-assembler');
const metaDao = require('./controllers/meta-dao');
const streamDao = require('./controllers/stream-dao');


async function upsertMovieData(movie) {
    const movie = disassemble(req.body);

    await metaDao.upsert(movie.meta);
    await movie.streams.map(m => {
        streamDao.upsert(m)
    });
}

module.exports = function getProxyRouter(addonInterface) {
    const router = getRouter(addonInterface);

    router.post('/movie', (req, res) => {
        upsertMovieData(req.body)
            .then(() => res.send(200))
            .catch(err => res.send(err))
    });

    return router
}