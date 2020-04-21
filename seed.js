const catalogDao = require('./persistence/controllers/catalog-dao');
const manifestDao = require('./persistence/controllers/manifest-dao');
const metaDao = require('./persistence/controllers/meta-dao');
const streamDao = require('./persistence/controllers/stream-dao');

catalogs = [catalogDao.add({
    type: "movie",
    id: "BrazilianCatalog",
    name: "Filmes Dublados (ptbr)",
    extra: [{ name: "search" }]
}).id];

manifestDao.add({
    id: "brazilian-addon",
    name: "Brazilian Addon",
    version: "0.0.1",
    description: "Stremio addon for dubbed movies in portuguese (brazil).",
    resources: ["catalog", "stream", "meta"],
    types: ["movie"],
    catalogs,
    idPrefixes: ["br"],
});

metaDao.add({
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

streamDao.add({
    metaId: "br18374950",
    name: "Star Wars: Episode IX – The Rise of Skywalker",
    type: "movie",
    infoHash: "e606fef7ee4bba72bde96e5c8767702b4fef0f06",
    sources: [
        "dhte606fef7ee4bba72bde96e5c8767702b4fef0f06"
    ]
});
