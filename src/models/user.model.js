const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    ID: { type: String, required: true },    
    dateOfBirth: {type: Date, required:true},
    phoneNumber: { type: String, required: true }    
  
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("Users", userSchema);

module.exports = user;