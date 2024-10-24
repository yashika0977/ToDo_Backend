
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (optional, if you want to add static assets like CSS)
app.use(express.static("public"));

// Array to hold blog posts
let posts = [];

// Redirect root URL to /posts
app.get('/', (req, res) => {
  res.redirect('/posts');  // Redirect to /posts
});

// Route to display form and list of blog posts
app.get('/posts', (req, res) => {
  res.render('posts', { posts: posts });
});

// Route to handle form submission and add new post
app.post('/addPost', (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body
  };
  posts.push(post);  // Add the new post to the posts array
  res.redirect('/posts');  // Redirect back to the posts page
});

// Route to display individual post details by title
app.get('/posts/:title', (req, res) => {
  const requestedTitle = req.params.title.toLowerCase();  // Get title from URL
  const post = posts.find(p => p.title.toLowerCase() === requestedTitle);  // Find the post
  
  if (post) {
    res.render('postDetail', { post: post });  // Render the post details page
  } else {
    res.send("Post not found");  // If no post matches the title, show this message
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});