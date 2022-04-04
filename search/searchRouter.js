//Author: Sowjanya Mani

const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");


const router = express.Router();

var mongo = require('../mongo');

// Endpoint to return the search results
mongo.connectDB(async (err) => {
    if (err) throw err;
    const db = mongo.getDatabase();

    const collection = db.collection("advertisments")

    router.post('/getad', async (req, res) => {
        const value = req.body.value;

        let filtervalue = new RegExp(["^", value, "$"].join(""), "i");
        console.log(filtervalue);


        console.log(value);
        collection.find({ $text: { $search: value } }).toArray().then((results) => {
            console.log(results.length);

            const response = {
                success: true,
                data: results,
            };
            return res.status(200).json(response);
        })
            .catch((error) => {
                console.error(error);
                const response = {
                    success: false,
                    data: null,
                    message: "No product found!"
                };
                return res.status(400).json(response);
            });

    });


});

module.exports = router;