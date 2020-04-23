const {
    getRouter
} = require('stremio-addon-sdk');
const disassemble = require('./controllers/movie-assembler');
const metaDao = require('./controllers/meta-dao');
const streamDao = require('./controllers/stream-dao');


async function upsertMovieData(movie) {
    await metaDao.upsert(movie.meta);
    await movie.streams.map(m => {
        streamDao.upsert(m)
    });
}

module.exports = function getProxyRouter(addonInterface) {
    const router = getRouter(addonInterface);

    router.post('/movie', (req, res) => {
        const movie = disassemble(req.body);

        upsertMovieData(movie)
            .then(() => res.send(200))
            .catch(err => res.send(err))
    });
}