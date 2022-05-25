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
const Product = require("./models/product.js");

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
// MOUNT ROUTES
// =================================================
//Seed
const productSeed = require("./models/productSeed.js");
app.get("/shop/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (error, allProducts) => {
        res.redirect("/shop");
    })
})
    

// Index
app.get("/shop", (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        });
    });
});

// New
app.get("/shop/new", (req, res) => {
    res.render("new.ejs");
});
// Destroy
// Update
// Create
app.post('/shop', (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.qty = Number (req.body.qty)
    console.log("req.body :")
    console.log(req.body)
    Product.create(req.body, (error, createdProduct) => {
        console.log("created product:")
        console.log(createdProduct);
        res.redirect("/shop");
        console.log(error)
    });   
});
// Edit
// Show

// =================================================
// Port Listening?
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});