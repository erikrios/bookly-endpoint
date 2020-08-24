const mongoose = require('mongoose');
const express = require('express');
const { Book, validate } = require('../models/book');
const { Author } = require('../models/author');

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await Book.find().sort('title');
    res.send(books);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id);

    if (!book) return res.status(404).send('The author with the given ID was not found.');

    res.send(book);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const authors = [];
    for (let index in req.body.authorsId) {
        const authorId = req.body.authorsId[index];
        const author = await Author.findById(authorId).select('-__v');
        if (!author) return res.status(404).send('The author with the given ID was not found.');
        authors.push(author);
    }

    const book = new Book({
        title: req.body.title,
        authors: authors,
        publisher: req.body.publisher,
        numberInStock: req.body.numberInStock
    });

    await book.save();
    return res.send(book);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const authors = [];
    for (let index in req.body.authorsId) {
        const authorId = req.body.authorsId[index];
        const author = await Author.findById(authorId).select('-__v');
        if (!author) return res.status(404).send('The author with the given ID was not found.');
        authors.push(author);
    }

    const book = await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        authors: authors,
        publisher: req.body.publisher,
        numberInStock: req.body.numberInStock
    }, { new: true });

    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

module.exports = router;