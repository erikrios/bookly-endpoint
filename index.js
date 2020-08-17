// Import Express.js and Joi dependency
const express = require('express');
const Joi = require('joi');

// Create the instance of express
const app = express();

// Add JSON middleware
app.use(express.json());

// Add GET HTTP Method to "/" endpoint
app.get('/', (req, res) => {
    res.contentType('application/json');
    res.send(JSON.stringify({ message: "Hello, World!" }));
});

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));