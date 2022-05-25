// =================================================
// DEPENDCIES & DATA VARIABLES
// =================================================
// -- packages
const express = require("express");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
const mongoose = require('mongoose');
// const { create } = require("./models/products.js");
const PORT = process.env.PORT || 3000;

// -- databases
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


// ------ database connections error/success
const db = mongoose.connection

db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// =================================================
// MOUNT MIDDLEWARE
// =================================================
// -- encode input data to req.body
app.use(express.urlencoded({ extended: true }));

// -- method-override for deletes & puts
app.use(methodOverride("_method"));

// -- add static files
app.use(express.static("public"));

// =================================================
// ROUTES & CONTROLLERS
// =================================================
const router = require('./controllers/products')
app.use('/shop', router);

// =================================================
// Port Listening?
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});