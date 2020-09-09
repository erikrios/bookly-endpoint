const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    // Create a connection to MongoDB
    const db = config.get('db');

    mongoose.connect('mongodb+srv://bookly-user:mypassword@clusterbookly.rturt.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info('Connected to MongoDB...'));
}