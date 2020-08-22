// Import db-connection
const { Author, Book } = require('./db-connection');

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
            error: {
                message: error.reason.message
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
            error: {
                message: error.reason.message
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
            error: {
                message: error.reason.message
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
            error: {
                message: error.reason.message
            }
        }
    }
}

// Check the document exitst or not
async function isExists(id) {
    try {
        return await Book
            .findById(id)
            .count() > 0;
    } catch (error) {
        return {
            error: {
                message: error.reason.message
            }
        }
    }
}

module.exports = {
    addBook: addBook,
    getBooks: getBooks,
    getBook: getBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    isExists: isExists
}