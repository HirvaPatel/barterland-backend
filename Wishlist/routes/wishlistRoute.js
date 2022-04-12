//Author: Shivam Barot

const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const wishlistRouter = express.Router();
var mongo = require('../../mongo');

// Getting all the items of the wishlist
wishlistRouter.get("/user/:id", async (req, res) => {

    mongo.connectDB(async (err) => {
        if (err) throw err;

        var wishlistproducts = [];
        const userid = req.params.id;
        const db = mongo.getDatabase();

        const user = await db.collection('users').find({ "user_id": userid }, { "wishlist": 1 }).toArray();
        if (user && user.length > 0) {
            const ids = user[0]["wishlist"];
            for (let i = 0; i < ids.length; i++) {

                const product = await db.collection('advertisments').find({ "ad_id": ids[i] }).toArray();
                wishlistproducts.push(product[0]);
            }
        }
        // console.log(wishlistproducts[0].ad_details);
        return res.status(200).json({ success: "true", data: wishlistproducts });
    });
});

// Removing specific item from the wishlist
wishlistRouter.put("/remove/:id", async (req, res) => {

    let productid = req.params.id;

    mongo.connectDB(async (err) => {
        if (err) throw err;

        var wishlistproducts = [];
        const userid = req.headers.user_id;
        const db = mongo.getDatabase();

        const user = await db.collection('users').find({ "user_id": userid }, { "wishlist": 1 }).toArray();
        let ids = user[0]["wishlist"];

        ids = ids.filter(item => item !== productid);

        console.log(ids );
        const user2 = await db.collection('users').updateOne({ "user_id": userid }, { $set: { "wishlist": ids } });

        for (let i = 0; i < ids.length; i++) {

            const product = await db.collection('advertisments').find({ "ad_id": ids[i] }).toArray();
            wishlistproducts.push(product[0]);
        }

        return res.status(200).json({ success: "true", data: wishlistproducts });
    });
});


// Adding specific item in the wishlist
wishlistRouter.put("/add/:id", async (req, res) => {

    let productid = req.params.id;

    mongo.connectDB(async (err) => {
        if (err) throw err;

        const userid = req.headers.user_id;
        const db = mongo.getDatabase();

        const user = await db.collection('users').find({ "user_id": userid }, { "wishlist": 1 }).toArray();
        let ids = user[0]["wishlist"];
        ids.push(productid);

        const user2 = await db.collection('users').updateOne({ "user_id": userid }, { $set: { "wishlist": ids } });

        return res.status(200).json({ success: "true" });
    });
});


module.exports = wishlistRouter;
