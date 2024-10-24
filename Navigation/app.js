const express = require('express');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Simulate user login status and name
let isLoggedIn = true; // Change this to false to simulate a logged-out user
let userName = 'Yashika';

// Home route
app.get('/', (req, res) => {
    res.render('navbar', { isLoggedIn, userName, currentPage: 'home' });
});

// Profile route
app.get('/profile', (req, res) => {
    if (isLoggedIn) {
        res.render('navbar', { isLoggedIn, userName, currentPage: 'profile' });
    } else {
        res.redirect('/login'); // Redirect to login if not logged in
    }
});

// Login route
app.get('/login', (req, res) => {
    res.render('navbar', { isLoggedIn: false, userName: null, currentPage: 'login' });
});

// Logout route (for demo purposes, logs the user out and redirects to home)
app.get('/logout', (req, res) => {
    isLoggedIn = false;
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
``
