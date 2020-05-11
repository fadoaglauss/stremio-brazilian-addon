br = db.getSiblingDB('brazilian-stremio-addon')
br.manifests.insert({
    id: "brazilian-addon",
    name: "Mico-Leão Dublado (BR addon)",
    logo: 'https://i.ibb.co/9tWdHsv/icon.jpg',
    version: "0.2.0",
    description: "Stremio addon for dubbed movies in portuguese (brazil).",
    resources: ["catalog", "stream"],
    types: ["movie"],
    catalogs: [{
        type: "movie",
        id: "BrazilianCatalog",
        name: "Filmes Dublados (ptbr)",
        genres: ["Ação", "Animação", "Aventura",  "Clássico", "Comédia", "Documentário", "Drama", "Fantasia", "Ficção", "Faroeste", "Guerra", "Músicas", "Nacional", "Policial", "Romance", "Suspense", "Terror"],
        extraSupported: ["search", "genre", "skip"]
    }],
    idPrefixes: ["tt"]
})