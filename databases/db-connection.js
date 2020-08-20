const mongoose = require('mongoose');

// Create a connection to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Could not connect to MongoDB', error));