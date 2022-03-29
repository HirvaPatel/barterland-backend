const req = require("express/lib/request");
const res = require("express/lib/response");

var mongo = require("../mongo");
const express = require("express");
const app = express();

app.use(express.json());

const router = express.Router();

router.get("", (req, res) => {
  const user_id = req.headers.user_id;
  mongo.connectDB(async (err) => {
    if (err) throw err;

    const db = mongo.getDatabase();
    const adsCollection = db
      .collection("advertisments")
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
        return res
          .status(200)
          .json({ message: "Ads retrieved", success: true, ads: results });
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
