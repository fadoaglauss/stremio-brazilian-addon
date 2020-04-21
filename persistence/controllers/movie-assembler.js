const magnet = require('magnet-uri')

function toStreamsData(movie) {
    return movie.magnets.map((m) => {

        const decode = magnet.decode(m);
        const infoHash = decode.infoHash.toLowerCase();
        const sources = decode.announce;

        return {
            title: movie.title,
            type: 'movie',
            infoHash,
            sources
        }
    });
}

//Disassemble
module.exports = (movie) => {
    return {
        streams: {
            metaId: movie.id,
            data: toStreamsData(movie)
        },
        meta: movie.meta
    }
}