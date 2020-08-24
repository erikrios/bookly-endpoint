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
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
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
        authorsId: Joi.array().items(Joi.objectId()).min(1).required(),
        publisher: Joi.string().min(5).max(100).required(),
        numberInStock: Joi.number().min(0).max(255).required()
    }

    return Joi.validate(book, schema);
}

module.exports = {
    Book: Book,
    validate: validateBook
};