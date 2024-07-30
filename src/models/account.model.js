const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        UserID: {type: mongoose.ObjectId},     
        Holder: {type: String}, 
        Bank: {type: String}, 
        IBAN: {type: String}, 
        Balance: {type: Number},
        Currency: {type: String},
        CurrencySymbol: {type: String}
        
    }
);

const account = mongoose.model("Accounts", accountSchema)

module.exports = account;


