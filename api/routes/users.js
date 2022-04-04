//Author: Sowjanya Mani

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();
const uuid = require("uuid");

var users = require("../model/users");
console.log(users);

var mongo = require("../../mongo");

//Mongoose connedtion
const mongoUrl = 'mongodb+srv://admin:Password123@barterland-dev.ljvc7.mongodb.net/barterland?retryWrites=true&w=majority';

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

//To find if the user is present and allow them to login into the application(Login)

router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }

  users
    .findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
              success: false,
            });
          }
          res.status(200).send({
            message: "Login Successful!",
            email: user.email,
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            address: user.address,
            success: true,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match, Try again!",
            error,
            success: false,
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "User not found, Try again!",
        e,
        success: false,
      });
    });
});

// To add a user to the application (Registration)
router.post("/register", (req, res) => {
  if (
    !req.body.email ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.security_ques ||
    !req.body.security_ans ||
    !req.body.password ||
    !req.body.address
  ) {
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }

  users.find({ email: req.body.email }, function (err, docs) {
    if (docs.length) {
      return res.status(200).json({
        message: "User Already Registered!!",
        success: true,
      });
    } else {
      var user_id = uuid.v4();
      var email = req.body.email;
      var first_name = req.body.first_name;
      var last_name = req.body.last_name;
      var role = "user";
      var created_at = Date.now();
      var security_ques = req.body.security_ques;
      var security_ans = req.body.security_ans;
      var address = req.body.address;

      bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
          const newUser = new users({
            _id: new mongoose.Types.ObjectId(),
            user_id,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role,
            created_at,
            security_ques,
            security_ans,
            address,
          });

          newUser
            .save()
            .then((result) => {
              console.log(result);
              return res.status(200).json({
                message: "User Sucessfully Registered!!",
                success: true,
              });
            })
            .catch((error) => {
              console.log(error);
              return res.status(400).json({
                message: "Internal server error",
                success: false,
              });
            });
        })
        .catch((e) => {
          response.status(400).send({
            message: "Password was not hashed successfully",
            e,
          });
        });
    }
  });
});

//To find if the user email exist before forgot password step
router.post("/finduser", (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }

  users
    .findOne({ email: req.body.email })
    .then((user) => {
      return res.status(200).send({
        message: "User found",
        user_id: user.user_id,
        email: user.email,
        security_ques: user.security_ques,
        security_ans: user.security_ans,
        success: true,
      });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
        success: false,
      });
    });
});

//To update forgotten password

router.post("/forgotpassword", (req, res) => {
  if (!req.body.password || !req.body.security_ans || !req.body.email) {
    console.log("Invalid Input");
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }

  users
    .findOne({ email: req.body.email })
    .then((user) => {
      if (req.body.security_ans === user.security_ans) {
        console.log("Correct answer");
        bcrypt
          .compare(req.body.password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              console.log(passwordCheck);
              bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                  return next(err);
                }
                user.password = hash;
                user.save();
              });

              return res.status(200).json({
                message: "Password Updated Successfully!!",
                success: true,
              });
            } else {
              return res.status(400).json({
                message: "Old password cannot be same as new password",
                success: false,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return res.status(400).send({
          message: "Security answer is incorrect, Try again!",
          success: false,
        });
      }
    })
    .catch((e) => {
      return res.status(400).send({
        message: "Try again!",
        success: false,
      });
    });
});

//To update address
router.post("/updateaddress", (req, res) => {
  if (!req.body.address || !req.body.user_id) {
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }
  users
    .findOne({ user_id: req.body.user_id })
    .then((user) => {
      user.address = req.body.address;
      user.save();
      return res.status(200).send({
        message: "Address Updated Successfully!",
        address: user.address,
        success: true,
      });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Session timed out, Please login to update details!",
        e,
        success: false,
      });
    });
});

//To delete user account
router.post("/delete", (req, res) => {
  users
    .findOneAndDelete({ user_id: req.body.user_id })
    .then((user) => {
      return res.status(200).send({
        message: "User Account Deleted Successfully!",
        success: true,
      });
    })
    .catch((e) => {
      res.status(404).send({
        message:
          "Session timed out, Please login before you can delete your account!",
        e,
        success: false,
      });
    });
});

//To update Name
router.post("/updatename", (req, res) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.user_id) {
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }
  users
    .findOne({ user_id: req.body.user_id })
    .then((user) => {
      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.save();
      return res.status(200).send({
        message: "User Name Updated Sucessfully!",
        first_name: user.first_name,
        last_name: user.last_name,
        success: true,
      });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Please login to update details!",
        e,
        success: false,
      });
    });
});

//To update email
router.post("/updateemail", (req, res) => {
  if (!req.body.email || !req.body.user_id) {
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }
  users
    .findOne({ user_id: req.body.user_id })
    .then((user) => {
      user.email = req.body.email;
      user.save();
      return res.status(200).send({
        message: "Email Updated Successfully!",
        email: user.email,
        success: true,
      });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Please login to update details!",
        e,
        success: false,
      });
    });
});

//To update new password

router.post("/updatepassword", (req, res) => {
  if (!req.body.oldpassword || !req.body.newpassword || !req.body.user_id) {
    return res.status(400).json({ message: "Invalid Inputs.", success: false });
  }

  users
    .findOne({ user_id: req.body.user_id })
    .then((user) => {
      bcrypt
        .compare(req.body.oldpassword, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Incorrect old password",
              error,
              success: false,
            });
          }

          bcrypt.hash(req.body.newpassword, 10, function (err, hash) {
            if (err) {
              return next(err);
            }
            user.password = hash;
            user.save();
          });
          return res.status(200).send({
            message: "Password Updated!",
            success: true,
          });
        })
        .catch((e) => {
          res.status(404).send({
            message: "Incorrect old password Try again!!",
            e,
            success: false,
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Please Login and Try again!!",
        e,
        success: false,
      });
    });
});

// To retrieve all the users present
router.get("/users", (req, res) => {
  users
    .find()
    .exec()
    .then((result) => {
      if (users || users.length) {
        return res.status(200).json({
          message: "users retrieved",
          success: true,
          users: result,
        });
      }
    })
    .catch((error) => {
      console.log((err) => {
        return res.status(500).json({
          message: "Internal server error",
          success: false,
        });
      });
    });
});

//to get users by id
router.get("/users/:user_id", async (req, res) => {
  mongo.connectDB(async (err) => {
    if (err) throw err;

    var wishlistproducts = [];
    const userid = req.params.user_id;
    const db = mongo.getDatabase();

    const user = await db
      .collection("users")
      .find({ user_id: userid })
      .toArray();
    return res.status(200).json({ success: "true", user: user });
  });
});

module.exports = router;
