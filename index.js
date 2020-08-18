// Import Express.js and Joi dependency
const express = require('express');
const Joi = require('joi');

// Import home and books routes
const home = require('./routes/home');
const books = require('./routes/books');

// Create the instance of express
const app = express();

// Add JSON middleware
app.use(express.json());

// Add home and books routes middleware
app.use('/', home);
app.use('/api/books', books);

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));