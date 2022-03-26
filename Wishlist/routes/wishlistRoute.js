const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
//const users = require('../model/users');
const wishlistRouter = express.Router();
var mongo = require('../../mongo');


wishlistRouter.get("/user", async (req, res) => {

    mongo.connectDB(async (err) => {
        if (err) throw err;

        var wishlistproducts = [];
        const userid = "5c7b8740-0917-42bd-9c47-74700fa575fb";
        const db = mongo.getDatabase();

        const user = await db.collection('users').find({ "user_id": userid }, { "wishlist": 1 }).toArray();
        const ids = user[0]["wishlist"];

        for (let i = 0; i < ids.length; i++) {

            const product = await db.collection('advertisments').find({ "ad_id": ids[i] }).toArray();
            wishlistproducts.push(product[0]);
        }
        console.log(wishlistproducts);
        return res.status(200).json({ success: "true", data: wishlistproducts });
    });
});

wishlistRouter.put("/remove/:id", async (req, res) => {

    const productid = parseInt(req.params.id);

    mongo.connectDB(async (err) => {
        if (err) throw err;

        var wishlistproducts = [];
        const userid = "5c7b8740-0917-42bd-9c47-74700fa575fb";
        const db = mongo.getDatabase();

        const user = await db.collection('users').find({ "user_id": userid }, { "wishlist": 1 }).toArray();
        let ids = user[0]["wishlist"];

        ids = ids.filter(item => item !== productid);
        console.log(ids);
        
        for (let i = 0; i < ids.length; i++) {

            const product = await db.collection('advertisments').find({ "ad_id": ids[i] }).toArray();
            wishlistproducts.push(product[0]);
        }

        return res.status(200).json({ success: "true", data: wishlistproducts });
    });
});


module.exports = wishlistRouter;