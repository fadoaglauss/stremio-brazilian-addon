
var m = require('mongoose');
var mongoose = m.connect('mongodb://localhost:27017/brazilian-addon-db');

module.exports = {
    mongoose
} 