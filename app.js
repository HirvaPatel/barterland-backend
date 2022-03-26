const express = require("express");
const cors = require('cors');

const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose")

const homeRouter = require("./home/homeRouter");
const dealsRouter = require("./deals/dealsRouter");
const rootRoute = '/api';

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());


const UserRoute = require("./api/routes/users");
app.use(rootRoute, UserRoute);

app.use("/home", homeRouter);
app.use("/deals", dealsRouter);

app.use(function (req, res) {
    res.status(404);
    const response = {
        message: "No mapping found for the requested resource - " + req.originalUrl, success: false
    }
    res.json(response);
    return;
});


module.exports = app;