const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const productRoutes = require('./api/routes/products');

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Setup
mongoose.connect('mongodb://shadid:shadid@ds253468.mlab.com:53468/auth', () => {
	console.log('DB Connected');
});

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use('/products', productRoutes);

module.exports = app;