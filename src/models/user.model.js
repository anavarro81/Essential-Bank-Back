const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },    
    email: { type: String},
    password: { type: String},
    dni: { type: String, required: true },    
    birthDate: {type: Date, required:true},
    phoneNumber: { type: String, required: true },   
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
    favourites: [{ type: Schema.Types.ObjectId, ref: 'transations' }]
  
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("Users", userSchema);

module.exports = user;