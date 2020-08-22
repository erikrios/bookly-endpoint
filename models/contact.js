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

module.exports = {
    contactSchema = contactSchema,
    Contact = Contact
}