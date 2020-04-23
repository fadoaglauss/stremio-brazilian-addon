const Manifest = require('../models/manifest')

module.exports = {
    get: async () => await Manifest.findOne().exec(),
    add: async (manifest) => await (new Manifest(manifest)).save()
}