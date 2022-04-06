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

//put endpoint to update the advertisement
router.put("", (req, res) => {
  const filter = { feedback_id: req.body.feedback_id };

  console.log("Feedback id: ", req.body.feedback_id);
  console.log("Feedback: ", req.body.feedback);
  // this option instructs the method to create a document if no documents match the filter
  const updateOptions = { upsert: true, returnNewDocument: true };

  //fetch the advertisement from the request body
  const updateDoc = {
    $set: {
      feedback: req.body.feedback,
    },
  };

  mongo.connectDB(async (err) => {
    if (err) throw err;

    //connect to the mongo database
    const db = mongo.getDatabase();
    const adsCollection = db
      .collection("feedback")
      .findOneAndUpdate(filter, updateDoc, updateOptions)
      .then((results) => {
        console.log(results);
        return res.status(200).json({
          message: "Document update",
          success: true,
          data: results.value,
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
