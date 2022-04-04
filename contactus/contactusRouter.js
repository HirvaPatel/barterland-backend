//Author: Sowjanya Mani

const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const router = express.Router();

var mongo = require("../mongo");

// Connect to DB; 
mongo.connectDB(async (err) => {
  if (err) throw err;

  // End point to get the contact information from the DB
  router.get("/contactdetails", (req, res) => {
    const db = mongo.getDatabase();
     db.collection("contactus")
      .find().toArray()
      .then((results) => {
        if (results.length > 0) {
          const response = {
            success: true,
            data: results,
          };
          return res.status(200).json(response);
        }
        const response = {
          success: false,
          data: null,
        };
        return res.status(400).json(response);
      })
      .catch((error) => {
        console.error(error);
        const response = {
          success: false,
          data: null,
        };
        return res.status(400).json(response);
      });
  });

});

module.exports = router;

