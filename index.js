// Import Express.js, Joi, and config dependency
const express = require('express');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);

// Create the instance of express
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));