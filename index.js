// Import Express.js, Mongoose, Joi, and config dependency
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);

// Import home, books, members, authors, borrows, users, and auth routes
const home = require('./routes/home');
const books = require('./routes/books');
const members = require('./routes/members');
const authors = require('./routes/authors');
const borrows = require('./routes/borrows');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

// Create a connection to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Could not connect to MongoDB', error));

// Create the instance of express
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// Add JSON middleware
app.use(express.json());

// Add home, books, members, authors, borrows, users, and auth routes middleware
app.use('/', home);
app.use('/api/books', books);
app.use('/api/members', members);
app.use('/api/authors', authors);
app.use('/api/borrows', borrows);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));