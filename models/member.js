const Joi = require('joi');
const mongoose = require('mongoose');

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