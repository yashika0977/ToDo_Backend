const express = require('express');
const path = require('path');

const app = express();

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Directory for EJS templates

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // Render the search form (search.ejs)
    res.render('search');
  });
  
  app.get('/search', (req, res) => {
    const query = req.query.query; // Get the query from the URL
  
    // Example data to search from
    const items = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape',"Kuch Kuch hota hai" , "Stree2" , ""];
  
    // Filter the items that match the search query
    const results = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  
    // Render the results in the EJS template
    res.render('results', { query, results });
  });
  

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});