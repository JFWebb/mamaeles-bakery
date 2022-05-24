// =================================================
// DEPENDCIES & DATA VARIABLES
// =================================================
// -- packages
require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 3000;

// -- databases
mongoose.connect(process.env.DATABASE_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
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
app.use(express.urlencoded({extended: true}));

// -- method-override for deletes & puts
app.use(methodOverride("_method"));

// -- add static files
app.use(express.static("public"));

// =================================================
// MOUNT ROUTES
// =================================================
// Index
// New
// Destroy
// Update
// Create
// Edit
// Show

// =================================================
// Port Listening?
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});