movies = [
    {
        "id": "br18374950",
        "release_date": "18/03/2020",
        "title": "Star Wars: A Ascensão Skywalker",
        "original_title": "Star Wars: Episode IX – The Rise of Skywalker",
        "release_year": 2020,
        "cover": {
            "url": "https://image.tmdb.org/t/p/w342/lFx2i2pg1BoaD7grcpGDyHM1eML.jpg",
            "width": 250,
            "height": 350
        },
        "genres": [
            {
                "id": 1,
                "name": "Ação"
            },
            {
                "id": 2,
                "name": "Aventura"
            },
            {
                "id": 3,
                "name": "Ficção"
            }
        ],
        "runtime": "2 h 21 min",
        "rating": 6.7,
        "description": "Um ano após a batalha entre a Resistência e A Primeira Ordem em Crait, Rey (Daisy Ridley) segue treinando com a General Leia (Carrie Fisher) para se tornar uma Jedi. Ela ainda se encontra em conflito com seu passado e futuro e teme, mais do que nunca, pelas respostas que pode conseguir a partir de sua complexa ligação com Kylo Ren (Adam Driver). Este, por sua vez, também se encontra em conflito pela Força, ainda que esteja recebendo ordens diretas do temível e lendário Darth Sidious (Ian McDiarmid), outrora conhecido como Imperador Palpatine.",
        "torrent_link": "magnet:?xt=urn:btih:e606fef7ee4bba72bde96e5c8767702b4fef0f06"
    }
]

const magnet = require('magnet-uri')
const { addonBuilder, serveHTTP } = require('stremio-addon-sdk')
const addon = new addonBuilder({
    id: "brazilian-addon",
    name: "Brazilian Addon",
    version: "0.0.1",
    description: "Stremio addon for dubbed movies in portuguese (brazil).",
    resources: ["catalog", "stream", "meta"],
    types: ["movie"],
    catalogs: [
        {
            type: "movie",
            id: "BrazilianCatalog",
            name: "Filmes Dublados (ptbr)",
            extra: [{ name: "search" }]
        }
    ],
    idPrefixes: ["br"]
})

function fromMagnet(meta) {
    const decode = magnet.decode(meta.torrent_link);
    const infoHash = decode.infoHash.toLowerCase();

    const tags = [];
    if (meta.torrent_link.match(/720p/i)) tags.push("720p");
    if (meta.torrent_link.match(/1080p/i)) tags.push("1080p");

    return {
        name: meta.title,
        type: 'movie',
        infoHash: infoHash
    }
}

addon.defineStreamHandler((args) => {
    console.log("Stream")

    if (args.id.startsWith('br')) {
        //streams = movies.map((m) => { return m.id == args.id ? fromMagnet(m) : undefined });
        //console.log(streams);
        //return Promise.resolve({ streams: streams });
        return Promise.resolve({ streams: [{ infoHash: magnet.decode(movies[0].torrent_link).infoHash.toLowerCase() }] });
    } else {
        console.log('Deu muito errado')
        return Promise.resolve({ streams: [] });
    }
})

function toMeta(meta) {

    let poster
    let background
    if (meta.cover && meta.cover.url) {
        poster = meta.cover.url
        background = meta.cover.url
    }

    let genres
    if (meta.genres && meta.genres.length) {
        genres = meta.genres.map((elem) => { return elem.name })
    }
    m = {
        id: meta.id,
        name: meta.original_title || meta.title,
        type: 'movie',
        poster: poster || null,
        description: meta.description || null,
        imdbRating: meta.rating || null,
        year: meta.release_year || null,
        background: background,
        genres: genres || null,
        runtime: meta.runtime || null,
        language: 'ptbr',
    }
    console.log(m)
    return m
}

addon.defineMetaHandler((args) => {
    console.log('Meta')
    return new Promise((resolve, reject) => {
        console.log('Metaaa')
        if (args.type == 'movie' && args.id.startsWith('br')) {
            if (movies && movies.length) {
                resolve({ meta: movies.map((m) => { return m.id == args.id ? toMeta(m) : [] })[0] });
            } else {
                reject(new Error('Received Invalid Meta'))
            }
        }
    })
})

addon.defineCatalogHandler((args) => {
    return new Promise((resolve, reject) => {
        if (args.extra.search) {
            if (movies && movies.length) {

                meta = movies.map(toMeta)
                console.log('search')
                resolve({ metas: meta });

            } else {
                reject(new Error('No results found for: ' + args.extra.search))
            }
        } else if (args.type == 'movie' && args.id == 'BrazilianCatalog') {
            if (movies && movies.length) {

                meta = movies.map(toMeta)
                console.log('catalog')
                resolve({ metas: meta });
            } else {
                reject(new Error('Received Invalid Catalog Data'))
            }
        } else {
            reject(new Error('Invalid Catalog Request'))
        }
    })
})

serveHTTP(addon.getInterface(), { port: 7032 })