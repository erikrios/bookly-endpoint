// Import Express.js and Joi dependency
const express = require('express');
const Joi = require('joi');

// Create the instance of express
const app = express();

// Add JSON middleware
app.use(express.json());

const books = [
    {
        title: "Coders at Work : Reflections on the Craft of Programming",
        author: ["Peter Seibel"],
        publisher: "APPRESS"
    },
    {
        title: "Head First: Design Patterns",
        author: ["Eric Freeman", "Elisabeth Robson", "Bert Bates", "Kathy Sierra"],
        publisher: "O'REILLY"
    },
    {
        title: "Head First HTML and CSS",
        author: ["Elisabeth Robson", "Eric Freeman"],
        publisher: "O'REILLY"
    },
    {
        title: "Head First Java",
        author: ["Kathy Sierra", "Bert Bates"],
        publisher: "O'REILLY"
    },
    {
        title: "MONSTER ARDUINO : Panduan Praktis Belajar Arduino untuk Pemula",
        author: ["Hari Santoso"],
        publisher: "Elang Sakti"
    },
    {
        title: "Head First Object-Oriented Analysis & Design",
        author: ["Brett D. McLaughlin", "Gary Pollice", "David West"],
        publisher: "O'REILLY"
    }
]

// Add GET HTTP Method to "/" endpoint
app.get('/', (req, res) => {
    res.contentType('application/json');
    res.send(JSON.stringify({ message: "Hello, World!" }));
});

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));