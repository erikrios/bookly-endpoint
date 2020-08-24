const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
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
                type: String,
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
        memberId: Joi.objectId().required(),
        bookId: Joi.objectId().required()
    }

    return Joi.validate(borrow, schema);
}

module.exports = {
    Borrow: Borrow,
    validate: validateBorrow
};