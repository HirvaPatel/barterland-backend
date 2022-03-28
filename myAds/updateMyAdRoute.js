const req = require("express/lib/request");
const res = require("express/lib/response");

var mongo = require("../mongo");
const express = require("express");
const app = express();

app.use(express.json());
const router = express.Router();

router.put("", (req, res) => {
  const filter = { ad_id: req.body.ad_id };
  // this option instructs the method to create a document if no documents match the filter
  const updateOptions = { upsert: true };
  const updateDoc = {
    $set: {
      "ad_details.description": req.body.description,
      "ad_details.location": req.body.location,
      "ad_details.value": req.body.value,
      "ad_details.valid_till": req.body.valid_till,
    },
  };

  mongo.connectDB(async (err) => {
    if (err) throw err;

    // Mongo test implementation
    const db = mongo.getDatabase();
    const adsCollection = db
      .collection("advertisments")
      .findOneAndUpdate(filter, updateDoc, updateOptions, {
        returnNewDocument: true,
      })
      .then((results) => {
        console.log(results);
        return res.status(200).json({
          message: "Document update",
          success: true,
          data: results.value,
        });
      })
      .then((res) => {
        console.log("returned res: " + res);
      })
      .catch((error) => console.error(error));

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
