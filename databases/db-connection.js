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