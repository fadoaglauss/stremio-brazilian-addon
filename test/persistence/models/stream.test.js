var mongoose = require('mongoose');
const Stream = require('../../../src/persistence/models/stream')

beforeAll(async () => {
    await require('../../../src/config')
})
afterAll(async () => {
    await mongoose.disconnect()
})
afterEach(async () => {
    await Stream.deleteMany({}).exec()
})

const StreamStub = () => {
    return {
        metaId: "tt18374950",
        title: "Star Wars: Episode IX – The Rise of Skywalker",
        type: "movie",
        infoHash: "e606fef7ee4bba72bde96e5c8767702b4fef0f06",
        sources: [
            "dhte606fef7ee4bba72bde96e5c8767702b4fef0f06"
        ]
    }
}

test('Test model(e.g. stream) creation', () => {
    var stream = new Stream(StreamStub())

    var sources = Array.from(stream.sources)

    return expect({
            metaId: stream.metaId,
            infoHash: stream.infoHash,
            title: stream.title,
            sources,
            type: stream.type
        })
        .toEqual(StreamStub())
});



it('Should return simple object when saved', async () => {
    var stream = new Stream(StreamStub())

    const output = await stream.save()

    expect(output).toHaveProperty('_id')
    expect(output).toHaveProperty('__v')
})

it('Should be found after saving', async () => {
    var s = new Stream(StreamStub())

    var saved = await s.save();

    var found = await Stream.findOne({
        infoHash: StreamStub().infoHash
    }).exec()

    expect(found._id).toEqual(saved._id)
    expect(found.title).toEqual(saved.title)
    expect(Array.from(found.sources)).toEqual(Array.from(saved.sources))
})