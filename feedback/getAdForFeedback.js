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
  const advertisment_id = req.headers.ad_id;
  mongo.connectDB(async (err) => {
    if (err) throw err;

    //connect to mongo database
    const db = mongo.getDatabase();

    //get the advertisement details with the help of ad id
    db.collection("advertisments")
      .find({ ad_id: { $eq: advertisment_id } })
      .toArray()
      .then((results) => {
        console.log(results);
        return res.status(200).json({
          message: "Advertisements retrieved",
          success: true,
          advertisements: results[0],
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
