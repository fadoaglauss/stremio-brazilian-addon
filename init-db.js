br = db.getSiblingDB('brazilian-stremio-addon')
br.manifests.insert({
    id: "brazilian-addon",
    name: "Brazilian Addon",
    version: "0.0.1",
    description: "Stremio addon for dubbed movies in portuguese (brazil).",
    resources: ["catalog", "stream"],
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