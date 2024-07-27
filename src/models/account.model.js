const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        UserID: {type: mongoose.ObjectId},     
        Holder: {type: String}, 
        Bank: {type: String}, 
        IBAN: {type: String}, 
        Balance: {type: Number}
    }
);

const account = mongoose.model("Accounts", accountSchema)

module.exports = account;


// UserID
// Holder
// Bank
// IBAN
// Balance

//   Holder: 'Antonio Navarro',
//   Bank: 'Caixa Bank',
//   IBAN: 'ES001234567890123456 7890',
//   Balance: 1500,
//   _id: new ObjectId("66a4efd67fc8bca07a56a8b3")