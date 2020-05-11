const MetaDAO = require('../../../src/persistence/controllers/meta-dao')
var metaDAO

var meta = {
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
}

beforeAll(() => {
    metaDAO = new MetaDAO()
})
it('Should insert when upsert a meta with new id', async () => {
    const addSpy = jest.spyOn(metaDAO,"add").mockImplementation(()=>{})
    const updateSpy = jest.spyOn(metaDAO,"update").mockImplementation(()=>{})
    const getIdSpy = jest.spyOn(metaDAO,"getById").mockImplementation((id) => {
        return Promise.resolve(null)
    })
    metaDAO.getById.bind(metaDAO)

    await metaDAO.upsert(meta)

    expect(addSpy).toBeCalledTimes(1)
    expect(addSpy).toBeCalledWith(meta)
    expect(getIdSpy).toBeCalledTimes(1)
    expect(getIdSpy).toBeCalledWith(meta.id)
    expect(updateSpy).not.toBeCalled()

    addSpy.mockRestore()
    updateSpy.mockRestore()
    getIdSpy.mockRestore()
})
it('Should update when upsert a meta with known id', async () => {
    const addSpy = jest.spyOn(metaDAO,"add").mockImplementation(()=>{})
    const updateSpy = jest.spyOn(metaDAO,"update").mockImplementation(()=>{})
    const getIdSpy = jest.spyOn(metaDAO,"getById").mockImplementation((id) => {
        return Promise.resolve(meta)
    })
    metaDAO.getById.bind(metaDAO)

    await metaDAO.upsert(meta)

    expect(updateSpy).toBeCalledTimes(1)
    expect(updateSpy).toBeCalledWith(meta)
    expect(getIdSpy).toBeCalledTimes(1)
    expect(getIdSpy).toBeCalledWith(meta.id)
    expect(addSpy).not.toBeCalled()

    addSpy.mockRestore()
    updateSpy.mockRestore()
    getIdSpy.mockRestore()
})