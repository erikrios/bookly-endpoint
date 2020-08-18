// Import Express.js and Joi dependency
const express = require('express');
const Joi = require('joi');

// Import home routes
const home = require('./routes/home');

// Create the instance of express
const app = express();

// Add JSON middleware
app.use(express.json());

// Add home routes middleware
app.use('/', home);

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));