const Joi = require('joi');
const mongoose = require('mongoose');
const { contactSchema } = require('./contact');
const router = require('../routes/home');

// Create member schema
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    contact: {
        type: contactSchema
    }
});

// Create member model
const Member = mongoose.model('Member', memberSchema);

function validateMember(member) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(member, schema);
}

module.exports = {
    memberSchema: memberSchema,
    Member: Member,
    validateMember: validateMember
};