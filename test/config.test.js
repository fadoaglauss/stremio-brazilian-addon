var mongoose = require('mongoose')

it('Should exists and be in a default state', () => {
    expect(mongoose.connection.readyState).toEqual(mongoose.connection.states.disconnected)
})

describe('Mongo connection dependent tets', ()=>{
    beforeAll(async () => {
        await mongoose.connect(`mongodb://localhost:27017/brazilian-addon-db`).catch(fail)
    })
    afterAll(async () => {
        await mongoose.disconnect().catch(fail)
    })
    it('Should connect to running database', async () => {
        await expect(mongoose.connection.readyState).toEqual(mongoose.connection.states.connected)
    })
    async function createModel() {
        const Schema = mongoose.Schema
    
        const AccountSchema = new Schema({
            name: {
                type: 'String',
                required: true,
            }
        })
    
        return mongoose.model('Account', AccountSchema)
    }
    it('Should be allowed to save and find a new model to db', async () => {
        const Account = await createModel()
        var account = new Account({
            name: "Teste"
        })
    
        await account.save()
        var obtained_account = await Account.findById(account.id)
    
        expect(account.name).toEqual(obtained_account.name)

        await Account.deleteMany({}).exec()
    })

})
