const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();

app.use(express.json());

var mongo = require('./mongo');

const wishlistRoute = require("./Wishlist/routes/wishlistRoute");

mongo.connectDB(async (err) => {
    if (err) throw err;

    // Mongo test implementation
    const db = mongo.getDatabase();
    const usersCollection = db.collection('users').find().toArray()
        .then(results => {
            //  console.log(results)
        })
        .catch(error => console.error(error));



    app.use(function (req, res) {
        res.status(404);
        const response = {
            message: "No mapping found for the requested resource - " + req.originalUrl, success: false
        }
        res.json(response);
        return;
    });

});

app.use("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Accept, X-Requested-With, Authorization"
    );
    next();
});

app.use("/wishlist", wishlistRoute);


module.exports = app;