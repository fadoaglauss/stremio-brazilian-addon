const {
    getRouter
} = require('stremio-addon-sdk');
const bodyParser = require('body-parser')
const disassemble = require('./controllers/movie-assembler');
const MetaDAO = require('./controllers/meta-dao');
const StreamDAO = require('./controllers/stream-dao');


async function upsertMovieData(movie) {
    let metaDao = new MetaDAO()
    let streamDao = new StreamDAO()

    const {
        meta,
        streams
    } = disassemble(movie);

    await metaDao.addIfAbsent(meta);
    await streams.map(m => {
        streamDao.addIfAbsent(m)
    });
}
function getProxyRouter(addonInterface) {
    const router = getRouter(addonInterface);

    router.use(bodyParser.json());       // to support JSON-encoded bodies
    router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

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