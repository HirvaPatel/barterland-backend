const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");


const router = express.Router();

var mongo = require('../mongo');


mongo.connectDB(async (err) => {
    if (err) throw err;
    const db = mongo.getDatabase();

    const collection = db.collection("advertisments")

    router.get('/getad/:value', async (req, res) => {
        const value = req.params.value;

        let filtervalue = new RegExp(["^", value, "$"].join(""), "i");
        console.log(filtervalue);


        console.log(value);
        collection.find({ $text: { $search: value } }).toArray().then((results) => {
            console.log(results.length);
             
            if (results.length > 0) {
                const response = {
                    success: true,
                    data: results,
                };
                return res.status(200).json(response);
            }
            const response = {
                success: false,
                data: null,
                message: "No product found!"
            };
            return res.status(400).json(response);
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