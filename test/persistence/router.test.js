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
        id: "br18374950",
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
    magnets: ["magnet:?xt=urn:btih:a29655cfe1132c578112f5eeb5b927f54797a8b4"],
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
beforeEach(async()=>{
    await upsertMovieData(movie)
})
describe('Meta related tests', () => {
    it('Should create a new meta when first called', async () => {
        let metaDao = new MetaDAO()
        let metas = await metaDao.getAll()
        expect(metas).toHaveLength(1)

    })
    it('Should update meta values when called again', async () => {
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
        expect(metaDao.getById(movie.meta.id)).resolves.toEqual(expect.objectContaining({
            name
        }))
    })
})
describe('Stream related tests', () => {
    it('Should add streams with new infoHash', async () => {
        await upsertMovieData({
            meta: movie.meta,
            magnets: ["magnet:?xt=urn:btih:8b37e5b540c2bbe9c4f1513504c4f37a9d37b75b"]
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
})