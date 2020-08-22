const Joi = require('joi');
const mongoose = require('mongoose');
const { authorSchema } = require('./author');

// Create book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    authors: {
        type: [authorSchema],
        required: true
    },
    publisher: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create model class
const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = {
        title: Joi.string().min(5).max(100).required(),
        authorId: Joi.string().length(24).required(),
        publisher: Joi.string().min(5).max(100).required()
    }

    return Joi.validate(book, schema);
}

module.exports = {
    Book: Book,
    validateBook: validateBook
};