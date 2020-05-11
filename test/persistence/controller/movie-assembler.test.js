var mongoose = require('mongoose');
const MovieAssembler = require('../../../src/persistence/controllers/movie-assembler')
const MetaDao = require('../../../src/persistence/controllers/meta-dao');
const metaDao = new MetaDao();
const StreamDao = require('../../../src/persistence/controllers/stream-dao');
const streamDao = new StreamDao();
const Stream = require('../../../src/persistence/models/stream')
const Meta = require('../../../src/persistence/models/meta')

describe('When a movie is disassembled', () => {
    let movie
    beforeAll(async () => {
        await require('../../../src/config')
    })
    afterAll(async () => {
        await mongoose.disconnect()
    })
    afterEach(async () => {
        await Stream.deleteMany({}).exec()
        await Meta.deleteMany({}).exec()
    })
    beforeEach(async () => {
        movie = {
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
        var {
            meta,
            streams
        } = MovieAssembler(movie)
        
        await metaDao.add(meta)
        await streamDao.addIfAbsent(streams[0])
    })

    it('Should be in the stream collection', async () => {
        console.log(await metaDao.getAll());
        
        var meta = await metaDao.getById(movie.meta.id)
        
        for (const prop in movie.meta) {
            expect(meta).toHaveProperty(prop)
        }
    })
    it('Should be in the meta collection', async () => {
        var stream = (await streamDao.getByMetaId(movie.meta.id))[0]

        var hostnamePattern = /\w+:\/\/(.*?)[:/]?.*/g

        expect(movie.magnets[0].magnet).toContain(stream.infoHash)
        for (i of stream.sources){
            expect(movie.magnets[0].magnet).toContain(i.replace(hostnamePattern, '$1'))
        }
        expect(stream.metaId).toEqual(movie.meta.id)
        expect(stream.title).toEqual(movie.magnets[0].title)
    })
})