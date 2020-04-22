var port = process.env.PORT || 3000

const manifest = require('./persistence/controllers/manifest-dao');
const meta = require('./persistence/controllers/meta-dao');
const stream = require('./persistence/controllers/stream-dao');
const catalog = require('./persistence/controllers/catalog-dao');

const getRouter = require('./persistence/router');
const serveHTTP = require('./serveHTTP');
const { addonBuilder } = require('stremio-addon-sdk');

catalogs = [catalog.add({
    type: "movie",
    id: "BrazilianCatalog",
    name: "Filmes Dublados (ptbr)",
    extra: [{ name: "search" }]
}).id];

manifest.add({
    id: "brazilian-addon",
    name: "Brazilian Addon",
    version: "0.0.1",
    description: "Stremio addon for dubbed movies in portuguese (brazil).",
    resources: ["catalog", "stream", "meta"],
    types: ["movie"],
    catalogs,
    idPrefixes: ["br"],
});

meta.add({
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
});

stream.add({
    metaId: "br18374950",
    name: "Star Wars: Episode IX – The Rise of Skywalker",
    type: "movie",
    infoHash: "e606fef7ee4bba72bde96e5c8767702b4fef0f06",
    sources: [
        "dhte606fef7ee4bba72bde96e5c8767702b4fef0f06"
    ]
});




m = manifest.get().then((m) => { return m })
console.log(m)

/*
const addon = new addonBuilder(m[0])

addon.defineStreamHandler((args) => {
    if (args.id.startsWith('br')) {
        return Promise.resolve({ streams: stream.getByMetaId(args.id) });
    } else {
        return Promise.resolve({ streams: [] });
    }
})
*/
/*
addon.defineMetaHandler((args) => {
    return new Promise((resolve, reject) => {
        if (args.type == 'movie' && args.id.startsWith('br')) {
            resolve({ meta: catalogs.map((c) => { return c.id == args.id ? c : [] }) });
        }
    })
})
*/
/*
addon.defineCatalogHandler((args) => {
    return new Promise((resolve, reject) => {
        if (args.extra.search) {
            resolve({ metas: meta.getAll() });
        } else if (args.type == 'movie') {
            resolve({ metas: meta.getByCatalogId(args.id) });
        } else {
            reject(new Error('Invalid Catalog Request'));
        }
    })
})
serveHTTP(addon.getInterface(), { port, getRouter });
*/