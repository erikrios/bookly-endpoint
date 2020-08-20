const express = require('express');
const Joi = require('joi');
const db = require('../databases/db-operations');
const router = express.Router();

// Add GET HTTP Method to "/api/books" endpoint
router.get('/', async (req, res) => {
    const result = await db.getBooks();
    res.contentType('application/json');
    res.send(JSON.stringify(result));
});

// Add GET HTTP Method to "/api/books/:id" endpoint
router.get('/:id', async (req, res) => {
    res.contentType('application/json');
    const id = req.params.id;
    const isExists = await db.isExists(id);

    if (!isExists) {
        res.status(404);
        res.send(JSON.stringify({
            error: {
                message: `Book with id ${id} not found!`
            }
        }));
        return;
    }

    const result = await db.getBook(id);
    res.send(JSON.stringify(result));
});

// Add POST HTTP Method to "/api/books" endpoint
router.post('/', async (req, res) => {
    res.contentType('application/json');
    const book = req.body;
    const { error } = validate(book);

    if (error) {
        res.status(400);
        res.send(JSON.stringify({
            errors: [
                {
                    message: error.details[0].message
                }
            ]
        }));
        return;
    }

    const result = await db.addBook(book);

    res.send(JSON.stringify(result));
});

// Add PUT HTTP Method to "/api/books/:id" endpoint
router.put('/:id', async (req, res) => {
    res.contentType('application/json');
    const id = req.params.id;
    const book = req.body;

    const { error } = validate(book);

    if (error) {
        res.status(400);
        res.send(error.details[0]);
        return;
    }

    const isExists = await db.isExists(id);

    if (!isExists) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    res.send(JSON.stringify(result));
});

// Add DELETE HTTP Method to "/api/books/:id" endpoint
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = db.deleteBook(id);

    if (!result) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    res.contentType('application/json');
    res.send(JSON.stringify(result));
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