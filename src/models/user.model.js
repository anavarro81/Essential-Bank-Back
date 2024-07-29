const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },    
    email: { type: String, required: true },
    password: { type: String, required: true },
    dni: { type: String, required: true },    
    birthDate: {type: Date, required:true},
    phoneNumber: { type: String, required: true },   
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
    favourites: [{ type: Schema.Types.ObjectId, ref: 'favouriteTransations' }]
  
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("Users", userSchema);

module.exports = user;