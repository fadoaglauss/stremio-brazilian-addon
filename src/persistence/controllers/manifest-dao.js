const Manifest = require('../models/manifest')

class ManifestDAO{
    async get(){
        return Manifest.findOne().exec()
    }
    async add(manifest){
        return (new Manifest(manifest)).save()
    }
}

module.exports = ManifestDAO