const Manifest = require('../models/manifest')

module.exports = {
    get: () => new Promise((resolve, reject) => {
        Manifest
            .find()
            .then(resolve)
            .catch(reject);
    }),
}