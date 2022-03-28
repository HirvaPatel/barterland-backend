const req = require("express/lib/request");
const res = require("express/lib/response");

var mongo = require("../mongo");
const express = require("express");
const app = express();

app.use(express.json());
const router = express.Router();

router.delete("", (req, res) => {
  console.log("Delete Request body: ", req.body);
  const filter = { ad_id: req.body.ad_id };
  // this option instructs the method to create a document if no documents match the filter
  console.log("deleting the object: ", filter);
  mongo.connectDB(async (err) => {
    if (err) throw err;

    // Mongo test implementation
    const db = mongo.getDatabase();
    const adsCollection = db
      .collection("advertisments")
      .remove(filter)
      .then((results) => {
        console.log("Result after deleting", results);
        return res.status(200).json({
          message: "Document deleted",
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
