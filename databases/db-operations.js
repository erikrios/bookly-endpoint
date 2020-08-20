// Import db-connection
const Book = require('./db-connection');

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

module.exports.db = {
    addBook: addBook
}