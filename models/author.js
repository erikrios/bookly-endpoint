const Joi = require('joi');
const mongoose = require('mongoose');

// Create author schema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

// Create model class
const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(author, schema);
}

module.exports = {
    authorSchema: authorSchema,
    Author: Author,
    validateAuthor: validateAuthor
};