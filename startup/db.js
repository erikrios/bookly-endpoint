const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    // Create a connection to MongoDB
    mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info('Connected to MongoDB...'));
}