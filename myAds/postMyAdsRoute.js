/*
 * @author Hardik Mesvania hr860663@dal.ca
 * */
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
var mongo = require("../mongo");
const express = require("express");
const app = express();
const uuid = require("uuid");
const advertisements = require("../myAds/model/advertisements.js");

//use json body for the route
app.use(express.json());
const router = express.Router();

//put endpoint to update the advertisement

router.post("", (req, res) => {
    console.log(req.body.ad_details.title)
    mongo.connectDB(async (err) => {
        if (err) throw err;
    
        //connect to mongo database
        const user_id = req.body.user_id;
        const db = mongo.getDatabase();
       
        const newads = new advertisements({
            _id: new mongoose.Types.ObjectId(),
            ad_id:uuid.v4(),
            user_id:user_id,
            ad_details: {
            title: req.body.ad_details.title, 
            description: req.body.ad_details.description,
            image_url:req.body.ad_details.image_url,
            category:req.body.ad_details.category,
            location:req.body.ad_details.location,
            value:req.body.ad_details.value,
            valid_till:req.body.ad_details.valid_till
            }
        }
        
          );
          newads
          .save()
          .then((result) => {
            console.log(result);
            return res.status(200).json({
              message: "Ads Sucessfully posted!!",
              success: true,
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
