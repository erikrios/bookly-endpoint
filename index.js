// Import Express.js and Joi dependency
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Create the instance of express
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));