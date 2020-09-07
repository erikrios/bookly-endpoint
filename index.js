// Import Express.js, Mongoose, Joi, and config dependency
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

// Create a connection to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Could not connect to MongoDB', error));

// Create the instance of express
const app = express();

require('./startup/routes')(app);

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

process.on('unhadledRejection', (ex) => {
    throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/library',
    level: 'info'
});

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));