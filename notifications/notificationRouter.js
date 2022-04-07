/* Author : Vikram Babu Rajendran */

const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const router = express.Router();

var mongo = require("../mongo");

// Connect to DB; To use with all the API's
mongo.connectDB(async (err) => {
    if (err) throw err;

    const db = mongo.getDatabase();
    router.get("/:id", (req, res) => {
        const user_id = req.params.id;
        db.collection("notifications")
            .find({ user_id: user_id })
            .limit(12).sort({ $natural: -1 })
            .toArray()
            .then((results) => {
                if (results) {
                    const response = {
                        success: true,
                        data: results
                    };
                    return res.status(200).json(response);
                }

                const response = {
                    success: true,
                    data: []
                };
                return res.status(200).json(response);

            })
            .catch((error) => {
                console.error(error);
                const response = {
                    success: false,
                    data: null,
                };
                return res.status(400).json(response);
            });
    });

    router.get("/is_seen/:id", (req, res) => {
        const user_id = req.params.id;

        const db = mongo.getDatabase();
        db.collection("notifications")
            .updateMany(
                { user_id: user_id },
                { $set: { "is_seen": true } },
                { upsert: false }
            ).then((results) => {
                console.log(results);
            })
            .catch((error) => {
                console.error(error);
            });

        const response = {
            success: true
        };
        return res.status(200).json(response);
    });



});



module.exports = router;