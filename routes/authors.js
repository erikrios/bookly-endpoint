const mongoose = require('mongoose');
const express = require('express');
const { Author, validate } = require('../models/author');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const authors = await Author.find().sort('name');
    res.send(authors);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const author = await Author.findById(id);

    if (!author) return res.status(404).send('The author with the given ID was not found.');

    res.send(author);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const author = new Author({
        name: req.body.name
    });

    await author.save();
    res.send(author);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const author = await Author.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!author) return res.status(404).send('The author with the given ID was not found.');
    res.send(author);
});

router.delete('/:id', async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) return res.status(404).send('The author with the given ID was not found.');
    res.send(author);
});

module.exports = router;