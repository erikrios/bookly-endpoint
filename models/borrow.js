const Joi = require('joi');
const mongoose = require('mongoose');

const Borrow = mongoose.model('Borrow', new mongoose.Schema({
    member: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 50,
                required: true
            }
        }),
        required: true
    },
    book: {
        type: new mongoose.Schema({
            title: {
                ype: String,
                required: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now(),
        required: true
    },
    dateReturned: {
        type: Date
    }
}));

function validateBorrow(borrow) {
    const schema = {
        memberId: Joi.string().length(24).required(),
        bookId: Joi.string().length(24).required()
    }
}

module.exports = {
    Borrow: Borrow,
    validate: validateBorrow
}