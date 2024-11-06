const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (optional, if you want to add static assets like CSS)
// app.use(express.static("public"));

// Redirect root URL to /contact
app.get('/', (req, res) => {
    res.redirect('/contact');
});

// Route to display the contact form
app.get('/contact', (req, res) => {
    res.render('contact');  // Place this snippet here
});

// Route to handle form submission and display thank you message
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    res.render('thankyou', { name, email, message });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
