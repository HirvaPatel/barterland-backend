// Author :Hardik Mesvania (hr860663@dal.ca)
const mongoose = require("mongoose");

const AdsSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: String, required: true },
  ad_id: { type: String, required: true },
  ad_details:{
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String,required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    value: { type: String, required: true },
    valid_till: { type: String, required: true },
    image_url:{type: String}
    //
    
  },
  deals:{type:Array}
};

module.exports = mongoose.model("advertisments", AdsSchema);
