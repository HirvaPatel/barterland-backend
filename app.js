const express = require("express");
const cors = require('cors');

const req = require("express/lib/request");
const res = require("express/lib/response");

const homeRouter = require("./home/homeRouter");
const dealsRouter = require("./deals/dealsRouter");
const app = express();

app.use(cors());
app.use(express.json());

var mongo = require('./mongo');


// mongo.connectDB(async (err) => {
//     if (err) throw err;

//     // Mongo test implementation
//     const db = mongo.getDatabase();
//     const usersCollection = db.collection('advertisments').find().toArray()
//         .then(results => {
//             console.log(results)
//         })
//         .catch(error => console.error(error));

    

    app.use("/home", homeRouter);
    app.use("/deals",dealsRouter);

    app.use(function (req, res) {
        res.status(404);
        const response = {
            message: "No mapping found for the requested resource - " + req.originalUrl, success: false
        }
        res.json(response);
        return;
    });

// });

module.exports = app;