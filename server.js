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
const router = express.Router();

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
app.delete('/shop/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/shop')
    })
})
// Update
app.put("/shop/:id", (req, res) => {
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
    )
})

app.patch("/shop/:id", (req, res) => {
    // req.body.qty = Number (req.body.qty)
    // console.log(req.body);
    // req.body.qty -= req.body.qty;
    // Product.findByIdAndUpdate(req.params.id,
    //     { $inc : {qty : 1}},
    //     funtion (err, updatedProduct) => {
    //         res.redirect(`/shop/${req.params.id}`)
    //     })
        
// })
    Product.findById(req.params.id, (err, foundProduct) => {
        let newQty = foundProduct.qty - 1
        foundProduct.qty = newQty
        foundProduct.save();
        res.redirect(`/shop/${req.params.id}`)
        console.log(foundProduct)
    });

    // Product.findByIdAndUpdate(
    //     req.params.id,
    //     {$set: 
    //         {
    //             qty:
    //         }
    //     },
    //     (error, updatedProduct) => {
            
    //         res.redirect(`/shop/${req.params.id}`)
    //     }
    // )
})


// Create
app.post('/shop', (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.qty = Number (req.body.qty)
    Product.create(req.body, (error, createdProduct) => {
        console.log(createdProduct);
        res.redirect("/shop");
    });   
});

// Edit
app.get('/shop/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render("edit.ejs", {
            product: foundProduct,
        })
    })
})
// Show
app.get("/shop/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render("show.ejs", {
            product: foundProduct,
        })
    });
});
// =================================================
// Port Listening?
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});