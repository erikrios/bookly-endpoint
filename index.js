// Import Express.js and winston dependency
const express = require('express');
const winston = require('winston');

// Create the instance of express
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Server running on port ${port}...`));