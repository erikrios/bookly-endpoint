// Import Express.js, Mongoose, and Joi dependency
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Import home, books, members, authors, and borrows routes
const home = require('./routes/home');
const books = require('./routes/books');
const members = require('./routes/members');
const authors = require('./routes/authors');
const borrows = require('./routes/borrows');

// Create a connection to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Could not connect to MongoDB', error));

// Create the instance of express
const app = express();

// Add JSON middleware
app.use(express.json());

// Add home, books, members, authors, and borrows routes middleware
app.use('/', home);
app.use('/api/books', books);
app.use('/api/members', members);
app.use('/api/authors', authors);
app.use('/api/borrows', borrows);

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));