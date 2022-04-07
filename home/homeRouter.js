/* Author : Vikram Babu Rajendran */

const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const router = express.Router();

var mongo = require("../mongo");

// Connect to DB; To use with all the API's
mongo.connectDB(async (err) => {
  if (err) throw err;

  // Get Ads to display in Home Page.
  // Input : None
  // Output : List of Ads.
  router.get("/posts", (req, res) => {
    const db = mongo.getDatabase();
    const usersCollection = db
      .collection("advertisments")
      .find({}).sort({ $natural: -1 })
      .limit(12)
      .toArray()
      .then((results) => {
        console.log(results.length);
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

  //Get one Ad
  // Input : Ad ID [In params]
  // Ad details.
  router.get("/posts/:id", (req, res) => {
    const ad_id = req.params.id;
    console.log("Ad ID : " + ad_id);
    console.log(req.headers.user_id);
    const user_id = req.headers.user_id;
    const db = mongo.getDatabase();
    db.collection("advertisments")
      .findOne({ ad_id: ad_id })
      .then((results) => {
        console.log(results);
        if (results) {
          const deals = results.deals;
          let isDealProposed = false;
          let proposedDeal = {};
          if (deals.length > 0) {
            deals.forEach(function (deal, index) {
              if (
                deal.user_id === user_id &&
                deal.is_active &&
                deal.is_active === true
              ) {
                isDealProposed = true;
                proposedDeal = deal;
              }
            });
          }
          const response = {
            success: true,
            data: results,
            isDealProposed: isDealProposed,
            proposedDeal: proposedDeal,
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

  // Propose a deal.
  // Input : Deal details [In request body]
  // Output : Status
  router.post("/posts/:id/deals", (req, res) => {
    const ad_id = req.params.id;
    const request = req.body;

    const db = mongo.getDatabase();
    console.log(request);
    if (
      !request.user_id ||
      !request.name ||
      !request.mobile ||
      !request.title ||
      !request.description ||
      !request.location
    ) {
      const response = {
        success: false,
        message: "Invalid Inputs.",
      };
      return res.status(400).json(response);
    }

    db.collection("advertisments")
      .findOne({ ad_id: ad_id })
      .then((results) => {
        console.log(results);
        if (results) {
          const deal = {
            deal_id: Math.random().toString(36).slice(2),
            user_id: request.user_id,
            is_active: true,
            deal_details: {
              name: request.name,
              mobile: request.mobile,
              title: request.title,
              description: request.description,
              image_url: request.image,
              created_at: Date.now(),
              location: request.location,
              value: "",
              valid_till: "",
              status: "PROPOSED"
            },
          };

          const result = db
            .collection("advertisments")
            .updateOne({ ad_id: ad_id }, { $push: { deals: deal } })
            .then((result) => {
              console.log("Updated!");
            })
            .catch((err) => {
              console.log(err);
              const response = {
                success: false,
                message: "Something went wrong.",
              };
              return res.status(500).json(response);
            });


          db.collection("advertisments")
            .findOne({ ad_id: ad_id })
            .then((results) => {
              console.log(results);
              if (results) {
                db.collection("notifications").insertOne({
                  user_id: results.user_id,
                  is_seen: false,
                  notification: {
                    type: 'DEAL_PROPOSED',
                    ad_id: results.ad_id,
                    deal_id: null,
                    message: 'Someone proposed a deal!'
                  }
                }).then((results) => {
                  console.log(results);
                }).catch((error) => {
                  console.error(error);
                });
              }
            });

          const response = {
            success: true,
            message: "Deal proposed!",
          };
          return res.status(200).json(response);
        }
        const response = {
          success: false,
          message: "Ad not found!",
        };
        return res.status(400).json(response);
      })
      .catch((error) => {
        console.error(error);
        const response = {
          success: false,
          message: "Something went wrong.",
        };
        return res.status(500).json(response);
      });
  });

  // Delete a proposed deal
  // Input : Ad ID and Deal ID [In params]
  // Output : Status
  router.delete("/posts/:id/deals/:deal_id", (req, res) => {
    const ad_id = req.params.id;
    const deal_id = req.params.deal_id;
    const db = mongo.getDatabase();
    db.collection("advertisments")
      .findOne({ ad_id: ad_id })
      .then((results) => {
        console.log(results);
        if (results) {
          const result = db
            .collection("advertisments")
            .updateOne(
              { ad_id: ad_id, "deals.deal_id": deal_id },
              { $set: { "deals.$.is_active": false } }
            )
            .then((result) => {
              console.log("Updated!");
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
              const response = {
                success: false,
                message: "Something went wrong.",
              };
              return res.status(500).json(response);
            });
          const response = {
            success: true,
            message: "Deal deleted!",
          };
          return res.status(200).json(response);
        }
        const response = {
          success: false,
          message: "Ad not found!",
        };
        return res.status(400).json(response);
      })
      .catch((error) => {
        console.error(error);
        const response = {
          success: false,
          message: "Something went wrong.",
        };
        return res.status(500).json(response);
      });
  });
});

module.exports = router;
