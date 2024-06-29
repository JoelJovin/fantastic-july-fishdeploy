const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');


const app = express();


const port = process.env.PORT || 3000;


const allowedOrigins = ["http://127.0.0.1:5500","http://127.0.0.1:5501/", "http://localhost:5500","http://localhost:3000"];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  methods: "GET, POST, DELETE",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '..', 'assets')))

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'pages', 'homepage', 'signup.html'));
});

app.get('/addProduct', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'pages', 'admin', 'product-form.html'));
});

app.get('/addAddress', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'pages', 'product', 'cart.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'pages', 'homepage', 'login.html'));
});

const indexPath = '/Users/jjaisankar/Documents/draft/aazhi-fishes/index.html';
app.use('/assets', express.static('/Users/jjaisankar/Documents/draft/aazhi-fishes/assets'));
app.use('/assets', express.static('/Users/jjaisankar/Documents/draft/aazhi-fishes/assets'));
app.get('/index', (req, res) => {
    res.sendFile(indexPath);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


