const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

// Create a connection to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Could not connect to MongoDB', error));

// Create book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    author: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const value = v && v.length > 0;
                    callback(value);
                }, 1000);
            },
            message: 'A book should have one author.'
        }
    },
    publisher: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create model class
const Book = mongoose.model('Book', bookSchema);

// Add GET HTTP Method to "/api/books" endpoint
router.get('/', (req, res) => {
    res.contentType('application/json');
    res.send(JSON.stringify(books));
});

// Add GET HTTP Method to "/api/books/:id" endpoint
router.get('/:id', (req, res) => {
    res.contentType('application/json');
    const id = req.params.id;
    const result = books.find(book => book.id === parseInt(id));

    if (!result) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    res.send(JSON.stringify(result));
});

// Add POST HTTP Method to "/api/books" endpoint
router.post('/', (req, res) => {
    const book = req.body;
    const { error } = validate(book);

    if (error) {
        res.status(400);
        res.send(error.details[0]);
        return;
    }

    books.push(
        {
            id: books.length + 1,
            title: book.title,
            author: book.author,
            publisher: book.publisher
        }
    );

    res.contentType('application/json');
    res.send(books);
});

// Add PUT HTTP Method to "/api/books/:id" endpoint
router.put('/:id', (req, res) => {
    res.contentType('application/json');
    const id = req.params.id;
    const result = books.find(book => book.id === parseInt(id));

    if (!result) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    const book = req.body;
    const { error } = validate(book);

    if (error) {
        res.status(400);
        res.send(error.details[0]);
        return;
    }

    result.title = book.title;
    result.author = book.author;
    result.publisher = book.publisher;

    res.send(books);
});

// Add DELETE HTTP Method to "/api/books/:id" endpoint
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const result = books.find(book => book.id === parseInt(id));

    if (!result) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    const index = books.indexOf(result);
    books.splice(index, 1);

    res.send(result);
});

// Add a function to validate the book
const validate = book => {
    const schema = {
        title: Joi.string().min(3).required(),
        author: Joi.array().min(1).required(),
        publisher: Joi.string().min(3).required()
    }

    return Joi.validate(book, schema);
}

module.exports = router;