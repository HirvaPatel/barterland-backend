const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();

app.use(express.json());

var mongo = require('./mongo');


mongo.connectDB(async (err) => {
    if (err) throw err;

    // Mongo test implementation
    const db = mongo.getDatabase();
    const usersCollection = db.collection('users').find().toArray()
        .then(results => {
            console.log(results)
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

module.exports = app;