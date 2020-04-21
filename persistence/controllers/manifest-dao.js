const Manifest = require('../models/manifest')

module.exports = {
    get: () => new Promise((resolve, reject) => {
        Manifest
            .find()
            .then(resolve)
            .catch(reject);
    }),
    add: (manifest) => {
        const m = new Manifest(manifest);
        return m.save();
    },
}