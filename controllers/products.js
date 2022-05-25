const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// =================================================
// MOUNT ROUTES
// =================================================
//Seed
const productSeed = require("../models/productSeed.js");
router.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (error, allProducts) => {
        res.redirect("/shop");
    });
});
    

// Index
router.get("/", (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        });
    });
});

// New
router.get("/new", (req, res) => {
    res.render("new.ejs");
});

// Destroy
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/shop')
    });
});

// Update
router.put("/:id", (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.qty = Number (req.body.qty)
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedProduct) => {
            res.redirect(`/shop/${req.params.id}`)
        }
    );
});

router.patch("/:id", (req, res) => {

    Product.findById(req.params.id, (err, foundProduct) => {
        foundProduct.qty = foundProduct.qty - 1
        foundProduct.save();
        res.redirect(`/shop/${req.params.id}`)
    });

});


// Create
router.post('/', (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.qty = Number (req.body.qty)
    Product.create(req.body, (error, createdProduct) => {
        console.log(createdProduct);
        res.redirect("/shop");
    });   
});

// Edit
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render("edit.ejs", {
            product: foundProduct,
        });
    });
});

// Show
router.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render("show.ejs", {
            product: foundProduct,
        });
    });
});


// =================================================
// EXPORT
// =================================================
module.exports = router;
