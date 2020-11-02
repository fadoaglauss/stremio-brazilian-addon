var mongoose = require('mongoose');

const PORT = process.env.PORT || 3000
const DB_HOST = process.env.DB_HOST || "localhost"
const DB_PORT = process.env.DB_PORT || 27017
const DB_NAME = process.env.DB_NAME || "brazilian-addon-db"
const DB_USER = process.env.DB_USER
const DB_PSK = process.env.DB_PSK

async function connect() {
    try {
        let CREDENTIALS = ""
        if (DB_USER && DB_PSK) CREDENTIALS = `${DB_USER}:${DB_PSK}@`
        const mongouri = `mongodb+srv://${CREDENTIALS}${DB_HOST}:/${DB_NAME}`
        await mongoose.connect(mongouri)
        return mongouri
    } catch (err) {
        throw new Error(`Could not connect to db 'mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}': ${err}`)
    }
}

connect().then((uri) => {
    console.log(`MONGO URI: ${uri}`)
}).catch(console.error)

module.exports = {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME
}