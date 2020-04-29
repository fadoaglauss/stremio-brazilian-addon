db = db.getSiblingDB('brazilian-addon-db')
db.manifests.insert({
    id: "brazilian-addon",
    name: "Brazilian Addon",
    version: "0.0.1",
    description: "Stremio addon for dubbed movies in portuguese (brazil).",
    resources: ["catalog", "stream", "meta"],
    types: ["movie"],
    catalogs: [{
        type: "movie",
        id: "BrazilianCatalog",
        name: "Filmes Dublados (ptbr)",
        extra: [{
            name: "search"
        }]
    }],
    idPrefixes: ["br"]
})
