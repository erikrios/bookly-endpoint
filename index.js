// Import Express.js and Mongoose dependency
const express = require('express');
const mongoose = require('mongoose');

// Import home and books routes
const home = require('./routes/home');
const books = require('./routes/books');

// Create a connection to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Could not connect to MongoDB', error));

// Create the instance of express
const app = express();

// Add JSON middleware
app.use(express.json());

// Add home and books routes middleware
app.use('/', home);
app.use('/api/books', books);

// Create PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));