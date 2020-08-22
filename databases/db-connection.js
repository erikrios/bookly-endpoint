const mongoose = require('mongoose');

// Create a connection to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Could not connect to MongoDB', error));

// Create author schema
const authorSchema = new mongoose.Schema({
    author: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const value = v && v.length > 0;
                    callback(value);
                }, 1000);
            },
            message: 'A book should have one author.'
        }
    }
});

// Create model class
const Author = mongoose.model('Author', authorSchema);

// Create book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    authors: {
        type: [authorSchema],
        required: true
    },
    publisher: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create model class
const Book = mongoose.model('Book', bookSchema);

module.exports = {
    Author: Author,
    Book: Book
}