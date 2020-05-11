var mongoose = require('mongoose')
const timeout = require('../timeout')
const {
    upsertMovieData
} = require('../../src/persistence/router')
const MetaDAO = require('../../src/persistence/controllers/meta-dao');
const StreamDAO = require('../../src/persistence/controllers/stream-dao');
const Meta = require('../../src/persistence/models/meta');
const Stream = require('../../src/persistence/models/stream');

const movie = {
    meta: {
        id: "tt18374950",
        type: "movie",
        name: "Star Wars: Episode IX – The Rise of Skywalker",
        genres: ["Aventura", "Ficção", "Aventura"],
        poster: "https://image.tmdb.org/t/p/w342/lFx2i2pg1BoaD7grcpGDyHM1eML.jpg",
        background: "https://image.tmdb.org/t/p/w342/lFx2i2pg1BoaD7grcpGDyHM1eML.jpg",
        logo: "",
        description: "Um ano após a batalha entre a Resistência e A Primeira Ordem em Crait, Rey (Daisy Ridley) segue treinando com a General Leia (Carrie Fisher) para se tornar uma Jedi. Ela ainda se encontra em conflito com seu passado e futuro e teme, mais do que nunca, pelas respostas que pode conseguir a partir de sua complexa ligação com Kylo Ren (Adam Driver). Este, por sua vez, também se encontra em conflito pela Força, ainda que esteja recebendo ordens diretas do temível e lendário Darth Sidious (Ian McDiarmid), outrora conhecido como Imperador Palpatine.",
        releaseInfo: "2020",
        imdbRating: 6.7,
        runtime: "2 h 21 min",
        catalogs: ["BrazilianCatalog"],
    },
    magnets: [{
        title: "anyTitle Test",
        magnet: "magnet:?xt=urn:btih:6a8acb2eacd447671dab59dbb6ff1aa61e6ae31f&dn=COMANDO.TO%20-%20Star%20Wars%20-%20A%20Ascens%c3%a3o%20Skywalker%202020%205.1%20(1080p)%20DUAL&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2fglotorrents.pw%3a6969%2fannounce&tr=udp%3a%2f%2ftracker4.piratux.com%3a6969%2fannounce&tr=udp%3a%2f%2fcoppersurfer.tk%3a6969%2fannounce&tr=http%3a%2f%2ft2.pow7.com%2fannounce&tr=udp%3a%2f%2ftracker.yify-torrents.com%3a80%2fannounce&tr=http%3a%2f%2fwww.h33t.com%3a3310%2fannounce&tr=http%3a%2f%2fexodus.desync.com%2fannounce&tr=http%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=http%3a%2f%2fbt.careland.com.cn%3a6969%2fannounce&tr=http%3a%2f%2fexodus.desync.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.publicbt.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.istole.it%3a80%2fannounce&tr=http%3a%2f%2ftracker.blazing.de%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=http%3a%2f%2ftracker.yify-torrents.com%2fannounce&tr=udp%3a%2f%2ftracker.prq.to%2fannounce&tr=udp%3a%2f%2ftracker.1337x.org%3a80%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2740%2fannounce&tr=udp%3a%2f%2ftracker.ex.ua%3a80%2fannounce&tr=udp%3a%2f%2fipv4.tracker.harry.lu%3a80%2fannounce&tr=udp%3a%2f%2f12.rarbg.me%3a80%2fannounce&tr=udp%3a%2f%2ftracker.publicbt.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f11.rarbg.com%2fannounce&tr=udp%3a%2f%2ftracker.ccc.de%3a80%2fannounce&tr=udp%3a%2f%2ffr33dom.h33t.com%3a3310%2fannounce&tr=udp%3a%2f%2fpublic.popcorn-tracker.org%3a6969%2fannounce"
    }],
}
beforeAll(async () => {
    await require('../../src/config')
    await Promise.all([Meta.deleteMany().exec(), Stream.deleteMany().exec()])
})
afterAll(async () => {
    await mongoose.disconnect().catch(fail)
})
afterEach(async () => {
    await Promise.all([Meta.deleteMany().exec(), Stream.deleteMany().exec()])
})
beforeEach(async () => {
    await upsertMovieData(movie)
})
describe('Meta related tests', () => {
    it('Should create a new meta when first called', async () => {
        let metaDao = new MetaDAO()
        let metas = await metaDao.getAll()
        expect(metas).toHaveLength(1)

    })
    it('Should not create new meta values when called again', async () => {
        const name = "Star Wars: The Rise of Skywalker"
        await upsertMovieData({
            meta: {
                ...movie.meta,
                name
            },
            magnets: movie.magnets
        })
        let metaDao = new MetaDAO()
        let metas = await metaDao.getAll()

        expect(metas).toHaveLength(1)
    })
    it('Should keep old meta when adding new streams', async () => {
        const name = "Star Wars: The Rise of Skywalker"
        await upsertMovieData({
            meta: {
                ...movie.meta,
                name
            },
            magnets: movie.magnets
        })
        let metaDao = new MetaDAO()

        expect(metaDao.getById(movie.meta.id)).resolves.toEqual(expect.objectContaining({
            name: movie.meta.name
        }))
    })
})
describe('Stream related tests', () => {
    it('Should add streams with new infoHash', async () => {
        await upsertMovieData({
            meta: movie.meta,
            magnets: [{
                title: "another magnet",
                magnet: "magnet:?xt=urn:btih:8b37e5b540c2bbe9c4f1513504c4f37a9d37b75b"
            }]
        })

        await timeout(500)

        let streamDao = new StreamDAO()
        let streams = await streamDao.getByMetaId(movie.meta.id)

        expect(streams).toHaveLength(2)
    })
    it('Should not add streams with known infoHash', async () => {
        await upsertMovieData(movie)

        await timeout(500)

        let streamDao = new StreamDAO()
        let streams = await streamDao.getByMetaId(movie.meta.id)

        expect(streams).toHaveLength(1)
    })
    it('Should only add unknown infoHashes from list of streams', async () => {
        await upsertMovieData({
            meta: movie.meta,
            magnets: [
                {
                    title: "a last magnet",
                    magnet: "magnet:?xt=urn:btih:c7e25e85a95fc2ed93395a03a894fa07d93318f6"
                },
                ...movie.magnets,
                {
                    title: "another magnet",
                    magnet: "magnet:?xt=urn:btih:8b37e5b540c2bbe9c4f1513504c4f37a9d37b75b"
                }
            ]
        })

        await timeout(500)

        let streamDao = new StreamDAO()
        let streams = await streamDao.getByMetaId(movie.meta.id)

        expect(streams).toHaveLength(3)
    })
    it('Should not remove infoHashes not found on request', async () => {
        await upsertMovieData({
            meta: movie.meta,
            magnets: [{
                title: "another magnet",
                magnet: "magnet:?xt=urn:btih:8b37e5b540c2bbe9c4f1513504c4f37a9d37b75b"
            }]
        })

        await timeout(500)

        await upsertMovieData({
            meta: movie.meta,
            magnets: [
                {
                    title: "a last magnet",
                    magnet: "magnet:?xt=urn:btih:c7e25e85a95fc2ed93395a03a894fa07d93318f6"
                },
                {
                    title: "another magnet",
                    magnet: "magnet:?xt=urn:btih:8b37e5b540c2bbe9c4f1513504c4f37a9d37b75b"
                }
            ]
        })

        await timeout(500)

        let streamDao = new StreamDAO()
        let streams = await streamDao.getByMetaId(movie.meta.id)

        expect(streams).toHaveLength(3)
    })
})