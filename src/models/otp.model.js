const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    UserID: {type: mongoose.ObjectId},
    email: { type: String},
    token: { type: String},
  
  },
  {
    timestamps: true,
  }
);

const otp = mongoose.model("Otp", otpSchema);

module.exports = otp;