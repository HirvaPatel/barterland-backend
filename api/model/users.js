/* Author: Sowjanya Mani */

const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  role: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  security_ques: { type: String, required: true },
  security_ans: { type: String, required: true },
  address: { type: String, required: true },
  wishlist: { type: Array },
};

module.exports = mongoose.model("users", userSchema);
