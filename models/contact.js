const Joi = require('joi');
const mongoose = require('mongoose');

// Create contact schema
const contactSchema = new mongoose.Schema({
    phone: {
        type: String,
        minlength: 10,
        maxlength: 12
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50
    }
});

// Create contact model
const Contact = mongoose.model('Contact', contactSchema);

function validateContact(contact) {
    const schema = {
        phone: Joi.string().min(10).max(12),
        email: Joi.string().min(5).max(50)
    };

    return Joi.validate(contact, schema);
}

module.exports = {
    contactSchema = contactSchema,
    Contact = Contact,
    validateContact = validateContact
};