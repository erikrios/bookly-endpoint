const express = require('express');

// Import home, books, members, authors, borrows, users, and auth routes
const home = require('../routes/home');
const books = require('../routes/books');
const members = require('../routes/members');
const authors = require('../routes/authors');
const borrows = require('../routes/borrows');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
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
}