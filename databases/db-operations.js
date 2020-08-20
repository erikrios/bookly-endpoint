// Import db-connection
const Book = require('./db-connection');
const { func } = require('joi');

// Add new document to database
async function addBook(newBook) {
    const book = new Book({
        title: newBook.title,
        author: newBook.author,
        publisher: newBook.publisher
    });

    try {
        return await book.save();
    } catch (error) {
        const errorResults = [];
        for (field in error.errors)
            errorResults.push({ message: error.errors[field].message });
        return { errors: errorResults };
    }
}

// Get all document
async function getBooks() {
    try {
        return await Book.find();
    } catch (error) {
        return {
            errors: {
                message: error
            }
        }
    }
}

// Get a document by id
async function getBook(id) {
    try {
        return await Book.findOne({
            _id: id
        });
    } catch (error) {
        return {
            errors: {
                message: error
            }
        }
    }
}

// Update the document
async function updateBook(id, newBook) {
    try {
        return await Book.findByIdAndUpdate(id, {
            $set: {
                title: newBook.title,
                author: newBook.author,
                publisher: newBook.publisher
            }
        }, { new: true });
    } catch (error) {
        return {
            errors: {
                message: error
            }
        }
    }
}

// Delete the document
async function deleteBook(id) {
    try {
        return await Book.deleteOne({ _id: id })
    } catch (error) {
        return {
            errors: {
                message: error
            }
        }
    }
}

module.exports = {
    addBook: addBook,
    getBooks: getBooks,
    getBook: getBook,
    updateBook: updateBook,
    deleteBook: deleteBook
}