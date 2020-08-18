const express = require('express');
const router = express.Router();

const books = [
    {
        id: 1,
        title: "Coders at Work : Reflections on the Craft of Programming",
        author: [
            "Peter Seibel"
        ],
        publisher: "APPRESS"
    },
    {
        id: 2,
        title: "Head First: Design Patterns",
        author: [
            "Eric Freeman",
            "Elisabeth Robson",
            "Bert Bates",
            "Kathy Sierra"
        ],
        publisher: "O'REILLY"
    },
    {
        id: 3,
        title: "Head First HTML and CSS",
        author: [
            "Elisabeth Robson",
            "Eric Freeman"
        ],
        publisher: "O'REILLY"
    },
    {
        id: 4,
        title: "Head First Java",
        author: [
            "Kathy Sierra",
            "Bert Bates"
        ],
        publisher: "O'REILLY"
    },
    {
        id: 5,
        title: "MONSTER ARDUINO : Panduan Praktis Belajar Arduino untuk Pemula",
        author: [
            "Hari Santoso"
        ],
        publisher: "Elang Sakti"
    },
    {
        id: 6,
        title: "Head First Object-Oriented Analysis & Design",
        author: [
            "Brett D. McLaughlin",
            "Gary Pollice",
            "David West"
        ],
        publisher: "O'REILLY"
    }
]

// Add GET HTTP Method to "/api/books" endpoint
router.get('/', (req, res) => {
    res.contentType('application/json');
    res.send(JSON.stringify(books));
});

// Add GET HTTP Method to "/api/books/:id" endpoint
router.get('/:id', (req, res) => {
    res.contentType('application/json');
    const id = req.params.id;
    const result = books.find(book => book.id === parseInt(id));

    if (!result) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    res.send(JSON.stringify(result));
});

// Add POST HTTP Method to "/api/books" endpoint
router.post('/', (req, res) => {
    const book = req.body;
    const { error } = validate(book);

    if (error) {
        res.status(400);
        res.send(error.details[0]);
        return;
    }

    books.push(
        {
            id: books.length + 1,
            title: book.title,
            author: book.author,
            publisher: book.publisher
        }
    );

    res.contentType('application/json');
    res.send(books);
});

// Add PUT HTTP Method to "/api/books/:id" endpoint
router.put('/:id', (req, res) => {
    res.contentType('application/json');
    const id = req.params.id;
    const result = books.find(book => book.id === parseInt(id));

    if (!result) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    const book = req.body;
    const { error } = validate(book);

    if (error) {
        res.status(400);
        res.send(error.details[0]);
        return;
    }

    result.title = book.title;
    result.author = book.author;
    result.publisher = book.publisher;

    res.send(books);
});

// Add DELETE HTTP Method to "/api/books/:id" endpoint
router.delete(':id', (req, res) => {
    const id = req.params.id;
    const result = books.find(book => book.id === parseInt(id));

    if (!result) {
        res.status(404);
        res.send(JSON.stringify({ error: `Book with id ${id} not found!` }));
        return;
    }

    const index = books.indexOf(result);
    books.splice(index, 1);

    res.send(result);
});

// Add a function to validate the book
const validate = book => {
    const schema = {
        title: Joi.string().min(3).required(),
        author: Joi.array().min(1).required(),
        publisher: Joi.string().min(3).required()
    }

    return Joi.validate(book, schema);
}