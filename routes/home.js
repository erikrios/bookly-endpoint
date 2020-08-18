const express = require('express');
const router = express.Router();

// Add GET HTTP Method to "/" endpoint
router.get('/', (req, res) => {
    res.contentType('application/json');
    res.send(JSON.stringify({ message: "Hello, World!" }));
});

module.exports = router;