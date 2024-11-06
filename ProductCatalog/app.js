const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Sample products data
let products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', image: 'images/product1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', image: 'images/product2.jpg' }
];

// Redirect root URL to /catalog
app.get('/', (req, res) => {
    res.redirect('/catalog');
});

// Route to display the product catalog
app.get('/catalog', (req, res) => {
    res.render('catalog', { products: products });
});

// Route to handle new product addition
app.post('/addProduct', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const image = 'images/' + req.file.filename;
    const newProduct = { id: products.length + 1, name, description, image };
    products.push(newProduct);
    res.redirect('/catalog');
});

// Route to display the product addition form
app.get('/addProduct', (req, res) => {
    res.render('addProduct');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
