//Author: Shivam Barot

const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const blogRouter = express.Router();
var mongo = require('../../mongo');


//adding the blog
blogRouter.post("/add", async (req, res) => {

    mongo.connectDB(async (err) => {
        if (err) throw err;

        const db = mongo.getDatabase();
        const user = await db.collection('blog').insertOne({
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description,
            status: 0
        });

        return res.status(200).json({ success: "true" });
    });
});

// Getting all the items of the blog
blogRouter.get("/getblog", async (req, res) => {

    mongo.connectDB(async (err) => {
        if (err) throw err;

        const db = mongo.getDatabase();

        const articles = await db.collection('blog').find().toArray();

        console.log(articles);
        return res.status(200).json({ success: "true", data: articles });
    });
});


module.exports = blogRouter;
