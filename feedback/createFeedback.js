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

//delete endpoint to remove the advertisements from the database
router.post("", (req, res) => {
  const reqBody = req.body;
  const sellerName = reqBody.sellerName;
  const productName = reqBody.productName;

  var newBody = {
    feedback_id: "5",
    user_id: reqBody.user_id,
    title: reqBody.title,
    feedback: reqBody.feedback,
  };

  // this option instructs the method to create a document if no documents match the filter
  mongo.connectDB(async (err) => {
    if (err) throw err;

    //connect to the mongo database
    const db = mongo.getDatabase();

    //get advertisements with the help of product name
    await db
      .collection("advertisments")
      .find({ "ad_details.title": { $eq: productName } })
      .toArray()
      .then((results) => {
        newBody["advertisement_id"] = results[0].ad_id;
      })
      .catch((error) => console.error(error));

    // get seller details from the user table with the help of seller name
    await db
      .collection("users")
      .find({ first_name: { $eq: sellerName } })
      .toArray()
      .then((results) => {
        newBody["seller_id"] = results[0].user_id;
      })
      .catch((error) => console.error(error));

    //create new entry for the feedback
    await db
      .collection("feedback")
      .insertOne(newBody)
      .then((results) => {
        return res.status(200).json({
          message: "Document created",
          success: true,
          data: newBody,
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
