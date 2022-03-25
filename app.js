const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose")

const app = express();

app.use(express.urlencoded({extended: true}))

app.use(express.json());



//var mongo = require('./mongo');

 const mongoUrl = 'mongodb+srv://admin:Password123@barterland-g16-web-proj.bypz4.mongodb.net/barterland?retryWrites=true&w=majority';

mongoose.connect(mongoUrl,{useNewUrlParser: true})
.then (() =>{
    console.log("connected to mongoDB")

})
.catch((err)=>{
    console.log("Connection Failed", err)
}) 


    const rootRoute ='/api';

    const UserRoute = require("./api/routes/users");
    app.use(rootRoute, UserRoute); 

    app.use(function (req, res) {
        res.status(404);
        const response = {
            message: "No mapping found for the requested resource - " + req.originalUrl, success: false
        }
        res.json(response);
        return;
    });



module.exports = app;