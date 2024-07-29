const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transationSchema = new Schema(
    {
        UserID: {type: mongoose.ObjectId},             
        BeneficiaryName: {type: String},
        BeneficiaryAccount: {type: String}, 
        BeneficiaryBank: {type: String},
        Currency: {type: String},
        RegistrationDate: {type: Date}, 
        amount: {type: Number},   
        tag: {type: String},
        description: {type: String},
        type: 
            {type: String,
            enum: ['pago por servicio', 'trasferencia']
        },
        isFavourite: {type: Boolean}
        
    }
);

const transation = mongoose.model("transations", transationSchema)

module.exports = transation;
