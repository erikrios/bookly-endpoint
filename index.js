// Import Express.js, Joi, and config dependency
const express = require('express');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

// Create the instance of express
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

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