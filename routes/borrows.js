const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const { Borrow, validate } = require('../models/borrow');
const { Member } = require('../models/member');
const { Book } = require('../models/book');

const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const borrows = await Borrow.find().sort('-dateOut');
    res.send(borrows);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0]).message;

    const member = Member.findById(req.body.memberId);
    if (!member) return res.status(400).send('Invalid member.');

    const book = Book.findById(req.body.bookId);
    if (!book) return res.status(400).send('Invalid book.');

    if (book.numberInStock === 0) return res.status(400).send('Book not in stock.');

    let borrow = new Borrow({
        member: {
            _id: member._id,
            name: member.name
        },
        book: {
            _id: (await book)._id,
            title: book.title
        }
    });

    try {
        new Fawn.Task()
            .save('borrows', borrow)
            .update('books', { _id: book._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(borrow);
    } catch (error) {
        res.status(500).send('Something failed.');
    }
    borrow = await borrow.save();

    book.numberInStock--;
    book.save();

    res.send(borrow);
});

router.get('/:id', async (req, res) => {
    const borrow = Borrow.findById(req.params.id);

    if (!borrow) return res.status(404).send('The borrow with the given ID was not found.');

    res.send(borrow);
});

module.exports = router;