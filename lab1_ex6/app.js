const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('HTTP request: GET /');
});
// Handle POST request
app.post('/', (req, res) => {
    res.send('HTTP request: POST /');
});

// Handle PUT request
app.put('/', (req, res) => {
    res.send('HTTP request: PUT /');
});

// Handle DELETE request
app.delete('/', (req, res) => {
    res.send('HTTP request: DELETE /');
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});