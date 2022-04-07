/*
 * @author Hirva Patel hirva.patel@dal.ca
 * */
const req = require("express/lib/request");
const res = require("express/lib/response");

var mongo = require("../mongo");
const express = require("express");
const app = express();

//use json body for the route
app.use(express.json());

const router = express.Router();

//get endpoint to fetch the advertisements
router.get("", (req, res) => {
  const seller_id = req.headers.seller_id;
  mongo.connectDB(async (err) => {
    if (err) throw err;

    //connect to mongo database
    const db = mongo.getDatabase();

    //get the seller details from user table with the help of user id
    db.collection("users")
      .find({ user_id: { $eq: seller_id } })
      .toArray()
      .then((results) => {
        console.log(results);
        return res.status(200).json({
          message: "User retrieved",
          success: true,
          seller: results,
        });
      })
      .catch((error) => console.error(error));

    //handle the not found error for the api
    app.use(function (req, res) {
      res.status(404);
      const response = {
        message:
          "No mapping found for the requested resource - " + req.originalUrl,
        success: false,
      };
      res.json(response);
      return;
    });
  });
});

module.exports = router;
