const express = require("express");
const cors = require("cors");

const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const homeRouter = require("./home/homeRouter");
const dealsRouter = require("./deals/dealsRouter");
const myAdsRoute = require("./myAds/getMyAdsRoute");
const updateMyAdRoute = require("./myAds/updateMyAdRoute");
const deleteMyRoute = require("./myAds/deleteMyAdRoute");
const getAllAdsRoute = require("./admin/getAllAdsRoute");
const rootRoute = "/api";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

var mongo = require("./mongo");

const wishlistRoute = require("./Wishlist/routes/wishlistRoute");

const UserRoute = require("./api/routes/users");
app.use(rootRoute, UserRoute);

app.use("/home", homeRouter);
app.use("/deals", dealsRouter);
app.use("/ads", getAllAdsRoute);
app.use("/myads", myAdsRoute);
app.use("/updatemyad", updateMyAdRoute);
app.use("/deletemyad", deleteMyRoute);
app.use("/wishlist", wishlistRoute);

app.use(function (req, res) {
  res.status(404);
  const response = {
    message: "No mapping found for the requested resource - " + req.originalUrl,
    success: false,
  };
  res.json(response);
  return;
});

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, X-Requested-With, Authorization"
  );
  next();
});

module.exports = app;
