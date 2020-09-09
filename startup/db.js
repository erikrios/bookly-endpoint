const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    // Create a connection to MongoDB
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info('Connected to MongoDB...'));
}